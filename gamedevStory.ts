import { StoryPart } from './types';

export const gamedevStoryParts: StoryPart[] = [
  {
    title: "Oyun Geliştirici Deneyimi",
    description: "Bir oyun stüdyosunda staja başladın. İlk görevin basit bir 2D oyun prototipi geliştirmek.",
    dimension: "gamedev_intro",
    choices: [
      {
        text: "Unity ile 2D platform oyunu geliştir",
        consequence: "Popüler bir oyun motoru kullanarak hızlı sonuç alıyorsun.",
        score: { analysis: 4, communication: 3 },
        nextDimension: "gamedev_unity"
      },
      {
        text: "Unreal Engine ile 2D platform oyunu geliştir",
        consequence: "Güçlü ancak öğrenmesi daha zor bir motor seçiyorsun.",
        score: { analysis: 5, communication: 2 },
        nextDimension: "gamedev_unreal"
      }
    ]
  }
];