import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { config } from "./config/environment";
import { connectToSupabase, supabase } from "./config/supabase";
import { setupAuth } from "./middleware/auth.middleware";
import { authRoutes } from "./routes/auth.routes";
import { progressRoutes } from "./routes/progress.routes";
import { setupVite, serveStatic, log } from "./vite";

const app = express();

// CORS configuration
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Request logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

// Connect to Supabase
connectToSupabase().then((connected) => {
  if (!connected) {
    process.exit(1);
  }
});

// Setup authentication
setupAuth(app);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/progress', progressRoutes);

// New /api/me endpoint
app.get('/api/me', async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      return res.status(401).json({ message: "No authorization header" });
    }

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error) {
      return res.status(401).json({ message: error.message });
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get('/api/users', async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase.from('users').select('*');

    if (error) {
      return res.status(500).json({ message: "Failed to retrieve users", error });
    }

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Error handling
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(status).json({ message });
  throw err;
});

// Static file serving and API fallback
if (app.get("env") === "development") {
  setupVite(app);
} else {
  serveStatic(app);
}

// Catch-all route for API endpoints to prevent HTML responses
app.use('/api/*', (req, res) => {
  res.status(404).json({ error: 'API endpoint not found' });
});

// Start server
app.listen(config.port, "0.0.0.0", () => {
  log(`Server running on port ${config.port}`);
});

export default app;