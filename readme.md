
---

# 📦 Zero downtime Deployment (CI/CD)

This repository hosts a robust inventory management system built with **Node.js** and **MongoDB**, featuring a modern, zero-downtime **Blue/Green deployment pipeline** managed by **GitHub Actions** and **Nginx**.

---

## ✨ Features

* **API Functionality**
  Complete CRUD operations for inventory items, user authentication, and more (based on your `package.json` dependencies).

* **Blue/Green Deployment**
  Achieves **zero downtime** by deploying new versions to a separate environment (Green) and switching Nginx traffic only after the new service is confirmed healthy.

* **Containerized Environment**
  Uses **Docker** for consistent packaging across development and production.

* **Secure Secrets Management**
  GitHub Actions Secrets store sensitive data such as MongoDB connection strings, API keys, and SSH credentials.

---

## 🛠️ Technology Stack

| Category      | Technology          | Purpose                                                   |
| ------------- | ------------------- | --------------------------------------------------------- |
| Backend       | Node.js, Express.js | Application runtime and API framework                     |
| Database      | MongoDB, Mongoose   | NoSQL database + ODM                                      |
| Deployment    | Docker, Docker Hub  | Containerization and image registry                       |
| CI/CD         | GitHub Actions      | Automation pipeline for build, push, and deploy           |
| Traffic Proxy | Nginx               | Reverse proxy for Blue/Green switching on ports 5001/5002 |

---

## 🚀 Deployment Setup Guide (AWS EC2)

This section explains the **one-time setup** needed on your EC2 instance to enable Blue/Green deployment.

### ✅ Prerequisites

* Ubuntu 20.04+ EC2 instance
* Your PEM key added to **GitHub Secrets** (`AWS_KEY`)
* Security Group opened for:

  * Port **22** (SSH)
  * Port **5000** (Application Access)

---

## 1. Install Docker and Nginx

SSH into your instance:

```bash
ssh ubuntu@<AWS_HOST>
```

Run:

```bash
# Update and install Docker + Nginx
sudo apt update
sudo apt install docker.io nginx -y

# Add current user to Docker group
sudo usermod -aG docker $USER
```

> ⚠️ **Log out and back in** for Docker permissions to take effect.

---

## 2. Configure Nginx Reverse Proxy

Remove default config:

```bash
sudo rm /etc/nginx/sites-enabled/default
```

Create a new config:

```bash
sudo nano /etc/nginx/sites-enabled/default
```

Paste:

```nginx
server {
    listen 5000;
    server_name _;

    location / {
        proxy_pass http://localhost:5001;

        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Start & reload Nginx:

```bash
sudo systemctl start nginx
sudo systemctl enable nginx
sudo systemctl reload nginx
```

---

## 3. Run the Initial **Blue** Container (Port 5001)

Start the initial container manually:

```bash
docker run -d \
    --name inventory-app_5001 \
    -p 5001:8000 \
    -e MONGO="mongodb+srv://<user>:<pass>@cluster0.uo7uglt.mongodb.net/efarm?retryWrites=true&w=majority" \
    -e PORT="5000" \
    -e TOKEN_SECRET="4c6ee5bb4ce3928dfabf9c6b074fa7e898e40191c4729a324686629af8ca2f704376177d721cebe5dfe04caac03786dd989c0141ff1d4c16b9b2b4336d9dc136" \
    <DOCKER_USERNAME>/inventory-app:latest
```

Check container:

```bash
docker ps
```

Your app should now be available at:

```
http://<AWS_HOST>:5000/
```

---

# ⚙️ CI/CD: The Blue/Green Workflow

The automated deployment is handled by:

```
.github/workflows/blue-green-deploy.yml
```

### 🔄 Workflow Steps

1. **Trigger** → On push to `main`.
2. **Build & Push** → Docker image is built and pushed to Docker Hub.
3. **SSH to EC2** → Using GitHub Secrets.
4. **Remote Execution via `deploy.sh`**:

   * Logs into Docker Hub
   * Detects active port (e.g., 5001)
   * Chooses target port (e.g., 5002)
   * Runs new container on target port
   * Waits 10 seconds
   * Updates Nginx to point to new port
   * Reloads Nginx
   * Removes old container
5. **Deployment complete** with zero downtime.

---

## 🔐 GitHub Secrets Required

| Secret Name     | Description               | Used In        |
| --------------- | ------------------------- | -------------- |
| AWS_HOST        | EC2 public IP             | Deployment SSH |
| AWS_USER        | EC2 username (ubuntu)     | Deployment SSH |
| AWS_KEY         | PEM key contents          | Deployment SSH |
| DOCKER_USERNAME | Docker Hub username       | Docker Login   |
| DOCKER_PASSWORD | Docker Hub password/token | Docker Login   |
| MONGO           | MongoDB connection string | Container Env  |
| PORT            | Public port (e.g., 5000)  | Container Env  |
| TOKEN_SECRET    | JWT secret                | Container Env  |

---

# 📦 Local Development

Clone the repo:

```bash
git clone <repository_url>
cd inventory-management
```

Install dependencies:

```bash
npm install
```

Create `.env`:

```
MONGO=<your_connection_string>
PORT=8000
TOKEN_SECRET=<your_secret>
```

Run locally:

```bash
npm run dev
# or
npm start
```

---

