# 🗑️ Trash Image Classification using Pre-trained Vision Transformer (ViT)

This project implements an image classification system using a **pre-trained Vision Transformer (ViT)** from Hugging Face, fine-tuned to classify waste images into six categories:

♻️ **Cardboard**, **Glass**, **Metal**, **Paper**, **Plastic**, and **Trash**

---

## 📊 Dataset

We used the [`garythung/trashnet`](https://huggingface.co/datasets/garythung/trashnet) dataset with the following distribution:

- 📦 Cardboard: **806 images**
- 🍾 Glass: **1002 images**
- 🥫 Metal: **820 images**
- 📄 Paper: **1188 images**
- 🧴 Plastic: **964 images**
- 🚯 Trash: **274 images**

> ⚠️ Due to class imbalance, a `WeightedRandomSampler` was used to ensure fair training.

---

## 🧠 Model Overview

We fine-tuned the powerful ViT model:

🔗 [`google/vit-base-patch16-224-in21k`](https://huggingface.co/google/vit-base-patch16-224-in21k)

The resulting model is published at:

🔗 [`tribber93/my-trash-classification`](https://huggingface.co/tribber93/my-trash-classification)

---

## ⚙️ Requirements

Install dependencies with:

```bash
pip install -r requirements.txt
```
