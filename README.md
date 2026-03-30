# 🧠 FlashBrain: AI Destekli Akıllı Flashcard Uygulaması

Bu proje, mobil cihaz kamerasından alınan görüntüleri analiz ederek kullanıcılar için otomatik öğrenme kartları (flashcards) oluşturan akıllı bir eğitim uygulamasıdır. 

## 🚀 Projenin Temel Amacı ve Görüntü İşleme Yaklaşımı
Projenin en can alıcı noktası, geleneksel manuel veri girişini ortadan kaldıran **görüntü işleme ve analiz** mimarisidir. 
Kullanıcı kameradan bir metnin (kitap, makale vb.) fotoğrafını çektiğinde:
1. Görüntü, Base64 formatına dönüştürülerek dijital bir veri paketine çevrilir.
2. Bu veri, **Google Gemini 1.5 Flash** yapay zeka modeline iletilerek ileri seviye bir görüntü işlemeye (Image-to-Text Analysis) tabi tutulur.
3. Model, görselin içindeki İngilizce kelimeleri tespit eder, Türkçe karşılıklarını bulur ve JSON formatında uygulamaya geri döndürür.

## 🛠️ Kullanılan Teknolojiler
* **Frontend:** React Native, Expo
* **Görüntü İşleme & AI:** @google/generative-ai (Gemini 1.5 Flash), expo-camera
* **Lokal Hafıza:** AsyncStorage
* **Geliştirme Metodolojisi:** NAIM İteratif Geliştirme Döngüsü

*(Bu proje, iteratif döngüler halinde adım adım inşa edilmiş ve tüm tarihçe Git üzerinden kayıt altına alınmıştır.)*