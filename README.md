# 🖌️ PictuRAS

![image](https://github.com/user-attachments/assets/180bbc4d-c9cf-4876-b67f-85a91c8ef937)

**PictuRAS** is a web app developed as part of the "Requisitos e Arquiteturas de Software" course for the academic year 2024/2025, as a part of the **Software Engineering Master's Degree**. Its main goal is to provide a powerful and easy to use image editing platform, with support for bulk editing, advanced AI-powered features and user account with different subscription levels.

## 🏆 Results
> 🏅 **19/20**

## 📒 Features

### Landing

![Screen Shot 2025-01-27 at 16 33 01](https://github.com/user-attachments/assets/ea13e4a7-ca18-4f19-827d-3fe64436daa3)

### Dashboard

![Screen Shot 2025-01-27 at 17 18 44](https://github.com/user-attachments/assets/1511c1e9-d64d-4146-a74f-4d6a66c005c1)

### New Project Dialog

<img src="https://github.com/user-attachments/assets/aa0e7aa3-0cb4-4674-bdc3-4cd8410fb66f" width="700px"/>

### Project Search

<img src="https://github.com/user-attachments/assets/8d6dc718-a2ee-4eb7-af35-bc303dd72390" width="400px"/>

### Project Renaming

<img src="https://github.com/user-attachments/assets/61c403e9-837f-406d-8532-29f194963a7d" width="500px" />

### Account Dialog

<img src="https://github.com/user-attachments/assets/b979849e-42c5-41aa-9a9b-2f32157bef73" width="500px" />

### Project View

- **Grid View**

![Screen Shot 2025-01-27 at 16 35 09](https://github.com/user-attachments/assets/430ca1be-ae1b-4af5-b77b-d50ce06b861d)

- **Carousel View**

![Screen Shot 2025-01-27 at 16 36 46](https://github.com/user-attachments/assets/b18b91c7-944e-4052-8e49-747c484ec591)

- **Tool Dialog**

<img src="https://github.com/user-attachments/assets/dddcb2a0-a6e0-481e-801d-f218c77b7071" width="500px"/>

- **Edit Preview**

![Screen Shot 2025-01-27 at 16 38 54](https://github.com/user-attachments/assets/0cb78759-d58e-4e26-bbf0-a2c20d4424bc)

- **Header Toolbar**

![Screen Shot 2025-01-27 at 16 35 09-1](https://github.com/user-attachments/assets/b0f980d3-480e-412f-8c35-16774a5ca52c)

- **Bulk Image Editing Progress** (using websockets)

![Screen Shot 2025-01-27 at 16 39 07](https://github.com/user-attachments/assets/b969a995-8f79-455f-861c-0fa727fee85d)

- **Results View**

![Screen Shot 2025-01-27 at 16 39 30](https://github.com/user-attachments/assets/cffe3e02-9cff-4790-8fcc-2b2864723a52)

- **Individual Image Actions** (right-click/hold enabled)

![Screen Shot 2025-01-27 at 16 39 44](https://github.com/user-attachments/assets/25f80a05-365a-4405-9200-1bd3b1702739)

### Account Management

- **Personal Info.**

![Screen Shot 2025-01-27 at 16 46 01](https://github.com/user-attachments/assets/33745703-e99f-4032-aace-f99e09048ce8)

- **Billing**

![Screen Shot 2025-01-27 at 16 45 54](https://github.com/user-attachments/assets/972b9e0c-ff6f-457b-89b8-cb2310d6a5d8)

- **Upgrade to Premium**

![Screen Shot 2025-01-27 at 16 45 51](https://github.com/user-attachments/assets/009a4e91-a966-4668-8880-e28b8dbd5e41)

### Sign In

![Screen Shot 2025-01-27 at 16 46 45](https://github.com/user-attachments/assets/c40f0a02-f282-4494-8c82-945dfe7f4e68)

### Sign Up

![Screen Shot 2025-01-27 at 16 47 10](https://github.com/user-attachments/assets/ac28c288-2a97-40ea-bca1-e9c350a6e271)

## 🔨 Development

From the repository root, run:

```sh
docker compose up --build -d
```

Frontend available on port `3000`.

## 🚀 Powered By

### Frontend

- [**Next.js**](https://nextjs.org/)
- [**shadcn/ui**](https://ui.shadcn.com/)
- [**tailwindcss**](https://tailwindcss.com/)
- [**TanStack Query**](https://tanstack.com/query/latest/docs/framework/react/overview)
- [**Axios**](https://axios-http.com/docs/intro)
- [**Socket.IO**](https://socket.io/)

### Backend

- [**Express.js**](https://expressjs.com/)
- [**RabbitMQ**](https://www.rabbitmq.com/)
- [**MinIO**](https://min.io/)
- [**MongoDB**](https://www.mongodb.com/)
- [**Socket.IO**](https://socket.io/)

### Deployment

- [**Docker**](https://www.docker.com/)
