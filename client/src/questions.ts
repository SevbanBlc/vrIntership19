import { Question } from './types';

export const questions: Question[] = [
  {
    question: "Bir ekip projesinde, en çok hangi rolde bulunmayı tercih edersin?",
    answers: [
      {
        text: "Farklı görüşleri dinleyip ortak bir karara varmaya çalışan arabulucu",
        score: {
          communication: 5,
          analysis: 2,
          teamwork: 4,
          creativity: 3,
          technical: 1
        }
      },
      {
        text: "Projenin detaylarını planlayan ve süreçleri yöneten organizatör",
        score: {
          communication: 3,
          analysis: 4,
          teamwork: 3,
          creativity: 2,
          technical: 3
        }
      },
      {
        text: "Problemleri çözmeye odaklanan ve teknik detayları inceleyen analist",
        score: {
          communication: 2,
          analysis: 5,
          teamwork: 2,
          creativity: 3,
          technical: 4,
          dataScience: 3
        }
      },
      {
        text: "Yeni ve yenilikçi fikirler üreten vizyoner",
        score: {
          communication: 3,
          analysis: 2,
          teamwork: 2,
          creativity: 5,
          technical: 2
        }
      }
    ]
  },
  {
    question: "Bir teknoloji projesinde çalışırken karşılaştığın zorlukları nasıl aşarsın?",
    answers: [
      {
        text: "İnternetten araştırma yaparım ve farklı çözümleri denerim",
        score: {
          communication: 2,
          analysis: 4,
          teamwork: 2,
          creativity: 3,
          technical: 4,
          devOps: 3
        }
      },
      {
        text: "Ekip arkadaşlarımla tartışır ve ortak bir çözüm bulmaya çalışırım",
        score: {
          communication: 5,
          analysis: 3,
          teamwork: 4,
          creativity: 3,
          technical: 2
        }
      },
      {
        text: "Sorunu daha küçük parçalara bölerek adım adım çözmeye çalışırım",
        score: {
          communication: 2,
          analysis: 5,
          teamwork: 2,
          creativity: 2,
          technical: 4,
          dataScience: 4
        }
      },
      {
        text: "Alışılmadık ve yenilikçi çözümler bulmaya çalışırım",
        score: {
          communication: 2,
          analysis: 3,
          teamwork: 2,
          creativity: 5,
          technical: 3
        }
      }
    ]
  },
  {
    question: "Hangi tip projelerde çalışmaktan daha çok keyif alırsın?",
    answers: [
      {
        text: "Kullanıcı deneyimini iyileştirmeye yönelik projeler",
        score: {
          communication: 4,
          analysis: 3,
          teamwork: 3,
          creativity: 4,
          technical: 3
        }
      },
      {
        text: "Verileri analiz ederek anlamlı sonuçlar çıkarma projeleri",
        score: {
          communication: 2,
          analysis: 5,
          teamwork: 2,
          creativity: 2,
          technical: 4,
          dataScience: 5
        }
      },
      {
        text: "Sistemlerin performansını ve güvenliğini iyileştiren teknik projeler",
        score: {
          communication: 2,
          analysis: 4,
          teamwork: 2,
          creativity: 2,
          technical: 5,
          devOps: 4
        }
      },
      {
        text: "Yenilikçi ve deneysel teknolojileri keşfetme projeleri",
        score: {
          communication: 3,
          analysis: 3,
          teamwork: 2,
          creativity: 5,
          technical: 4
        }
      }
    ]
  },
  {
    question: "İş hayatında hangi yaklaşımı benimsersin?",
    answers: [
      {
        text: "Planlı ve sistematik çalışmayı tercih ederim",
        score: {
          communication: 3,
          analysis: 4,
          teamwork: 3,
          creativity: 2,
          technical: 3
        }
      },
      {
        text: "Esnek ve adaptif olmayı tercih ederim",
        score: {
          communication: 4,
          analysis: 3,
          teamwork: 3,
          creativity: 4,
          technical: 2
        }
      },
      {
        text: "Detaylara önem veririm ve titiz çalışırım",
        score: {
          communication: 2,
          analysis: 5,
          teamwork: 2,
          creativity: 2,
          technical: 4,
          dataScience: 4
        }
      },
      {
        text: "Yenilikçi ve risk almaya açık bir yaklaşım benimserim",
        score: {
          communication: 3,
          analysis: 2,
          teamwork: 2,
          creativity: 5,
          technical: 3
        }
      }
    ]
  },
  {
    question: "Boş zamanlarında en çok ne yapmaktan hoşlanırsın?",
    answers: [
      {
        text: "Arkadaşlarımla vakit geçirmek veya sosyal etkinliklere katılmak",
        score: {
          communication: 5,
          analysis: 2,
          teamwork: 4,
          creativity: 3,
          technical: 1
        }
      },
      {
        text: "Kitap okumak veya belgesel izlemek",
        score: {
          communication: 2,
          analysis: 4,
          teamwork: 2,
          creativity: 3,
          technical: 3,
          dataScience: 3
        }
      },
      {
        text: "Bilgisayar oyunları oynamak veya teknolojik projeler geliştirmek",
        score: {
          communication: 2,
          analysis: 3,
          teamwork: 2,
          creativity: 3,
          technical: 5,
          devOps: 3
        }
      },
      {
        text: "Sanatsal aktiviteler (müzik, resim, yazı yazmak vb.)",
        score: {
          communication: 3,
          analysis: 2,
          teamwork: 2,
          creativity: 5,
          technical: 2
        }
      }
    ]
  },
  {
    question: "Birden fazla görevi aynı anda yapman gerektiğinde nasıl bir yol izlersin?",
    answers: [
      {
        text: "Öncelik sırasına göre liste yapar, adım adım ilerlerim",
        score: {
          communication: 3,
          analysis: 5,
          teamwork: 3,
          creativity: 2,
          technical: 3
        }
      },
      {
        text: "Ekip üyeleriyle görev paylaşımı yaparak işleri kolaylaştırırım",
        score: {
          communication: 5,
          analysis: 3,
          teamwork: 5,
          creativity: 2,
          technical: 2
        }
      },
      {
        text: "Zamanımı esnek şekilde yöneterek işleri dengelemeye çalışırım",
        score: {
          communication: 4,
          analysis: 3,
          teamwork: 3,
          creativity: 4,
          technical: 2
        }
      },
      {
        text: "Zor görevleri yenilikçi yaklaşımlarla hızlıca çözerim",
        score: {
          communication: 2,
          analysis: 3,
          teamwork: 2,
          creativity: 5,
          technical: 4
        }
      }
    ]
  },
  {
    question: "Yeni bir konu öğrenmen gerektiğinde ne yaparsın?",
    answers: [
      {
        text: "Online kurslar ve videolar izlerim",
        score: {
          communication: 3,
          analysis: 4,
          teamwork: 2,
          creativity: 2,
          technical: 4,
          dataScience: 2
        }
      },
      {
        text: "Uygulamalı şekilde deneme yaparak öğrenirim",
        score: {
          communication: 2,
          analysis: 3,
          teamwork: 2,
          creativity: 3,
          technical: 5,
          devOps: 4
        }
      },
      {
        text: "Arkadaşlarımla konuşarak ve fikir alışverişi yaparak öğrenirim",
        score: {
          communication: 5,
          analysis: 2,
          teamwork: 4,
          creativity: 3,
          technical: 2
        }
      },
      {
        text: "Konuyu derinlemesine okuyarak ve notlar alarak öğrenirim",
        score: {
          communication: 2,
          analysis: 5,
          teamwork: 2,
          creativity: 2,
          technical: 3,
          dataScience: 4
        }
      }
    ]
  },
  {
    question: "Takım içinde bir anlaşmazlık çıktığında nasıl tepki verirsin?",
    answers: [
      {
        text: "Tarafları dinleyip uzlaştırıcı bir yaklaşım sergilerim",
        score: {
          communication: 5,
          analysis: 3,
          teamwork: 5,
          creativity: 2,
          technical: 1
        }
      },
      {
        text: "Nedenleri analiz eder, çözüm önerileri sunarım",
        score: {
          communication: 3,
          analysis: 5,
          teamwork: 3,
          creativity: 2,
          technical: 3
        }
      },
      {
        text: "Ekip içindeki dengeleri gözeterek iletişim kurarım",
        score: {
          communication: 4,
          analysis: 3,
          teamwork: 4,
          creativity: 3,
          technical: 2
        }
      },
      {
        text: "Yenilikçi bir bakış açısıyla yeni yollar öneririm",
        score: {
          communication: 3,
          analysis: 2,
          teamwork: 2,
          creativity: 5,
          technical: 3
        }
      }
    ]
  },
  {
    question: "Yeni bir fikir ortaya çıktığında nasıl yaklaşım sergilersin?",
    answers: [
      {
        text: "Fikrin uygulanabilirliğini analiz ederim",
        score: {
          communication: 3,
          analysis: 5,
          teamwork: 2,
          creativity: 3,
          technical: 4
        }
      },
      {
        text: "Ekiple tartışarak farklı yönlerini değerlendiririm",
        score: {
          communication: 5,
          analysis: 3,
          teamwork: 4,
          creativity: 3,
          technical: 2
        }
      },
      {
        text: "Fikri hemen deneyerek test ederim",
        score: {
          communication: 2,
          analysis: 3,
          teamwork: 2,
          creativity: 4,
          technical: 5,
          devOps: 3
        }
      },
      {
        text: "Fikri geliştirerek yeni alternatifler üretirim",
        score: {
          communication: 3,
          analysis: 2,
          teamwork: 3,
          creativity: 5,
          technical: 3
        }
      }
    ]
  },
  {
    question: "Proje sürecinde kendini en çok hangi noktada öne çıkarırsın?",
    answers: [
      {
        text: "Takım iletişimini ve motivasyonunu artıran biri olarak",
        score: {
          communication: 5,
          analysis: 2,
          teamwork: 5,
          creativity: 2,
          technical: 1
        }
      },
      {
        text: "Problemleri analiz edip çözüm yolları bulan biri olarak",
        score: {
          communication: 3,
          analysis: 5,
          teamwork: 2,
          creativity: 3,
          technical: 4,
          dataScience: 3
        }
      },
      {
        text: "Yenilikçi fikirleri hayata geçiren biri olarak",
        score: {
          communication: 3,
          analysis: 2,
          teamwork: 2,
          creativity: 5,
          technical: 4
        }
      },
      {
        text: "Uygulama sürecinde teknik becerileriyle katkı sağlayan biri olarak",
        score: {
          communication: 2,
          analysis: 3,
          teamwork: 2,
          creativity: 3,
          technical: 5,
          devOps: 4
        }
      }
    ]
  }
];
