# DevOps Learning Portfolio - Static Website

A simple static website containerized with Docker and served with Nginx, demonstrating basic DevOps principles and practices.

## 🎯 Project Overview

This project is part of a comprehensive DevOps learning journey, showcasing:
- Static website development (HTML, CSS, JavaScript)
- Docker containerization
- Nginx web server configuration
- Best practices for container security and optimization

## 📁 Project Structure

```
devops-portfolio/
├── index.html          # Main HTML file
├── styles.css          # Styling
├── script.js           # Interactive JavaScript
├── Dockerfile          # Docker image configuration
├── nginx.conf          # Custom Nginx configuration
├── .dockerignore       # Files to exclude from Docker build
└── README.md           # This file
```

## 🚀 Quick Start

### Prerequisites
- Docker installed on your machine
- Basic understanding of command line

### Building the Docker Image

1. **Clone or download this repository**
   ```bash
   git clone <your-repo-url>
   cd devops-portfolio
   ```

2. **Build the Docker image**
   ```bash
   docker build -t devops-portfolio:latest .
   ```

3. **Run the container**
   ```bash
   docker run -d -p 8080:80 --name my-portfolio devops-portfolio:latest
   ```

4. **Access the website**
   Open your browser and navigate to: `http://localhost:8080`

### Alternative: Using Docker Compose (Optional)

Create a `docker-compose.yml` file:
```yaml
version: '3.8'
services:
  web:
    build: .
    ports:
      - "8080:80"
    container_name: devops-portfolio
    restart: unless-stopped
```

Then run:
```bash
docker-compose up -d
```

## 🛠 Docker Commands Reference

### Basic Operations
```bash
# Build the image
docker build -t devops-portfolio:latest .

# Run the container
docker run -d -p 8080:80 --name my-portfolio devops-portfolio:latest

# View running containers
docker ps

# View logs
docker logs my-portfolio

# Stop the container
docker stop my-portfolio

# Remove the container
docker rm my-portfolio

# Remove the image
docker rmi devops-portfolio:latest
```

### Advanced Operations
```bash
# Run with environment variables
docker run -d -p 8080:80 -e ENV=production --name my-portfolio devops-portfolio:latest

# Execute commands inside the container
docker exec -it my-portfolio /bin/sh

# Inspect the container
docker inspect my-portfolio

# View container resource usage
docker stats my-portfolio
```

## 🔧 Customization

### Modifying the Website
1. Edit `index.html`, `styles.css`, or `script.js`
2. Rebuild the Docker image: `docker build -t devops-portfolio:latest .`
3. Stop and remove the old container: `docker stop my-portfolio && docker rm my-portfolio`
4. Run the new container: `docker run -d -p 8080:80 --name my-portfolio devops-portfolio:latest`

### Nginx Configuration
- Modify `nginx.conf` to change server behavior
- Add SSL certificates for HTTPS
- Configure custom error pages
- Set up additional security headers

## 🔒 Security Features

This Docker setup includes several security best practices:
- Uses Alpine Linux base image (smaller attack surface)
- Runs Nginx as non-root user inside container
- Implements security headers in Nginx configuration
- Includes health checks for container monitoring
- Uses .dockerignore to exclude sensitive files

## 📊 Performance Optimizations

- **Gzip compression** enabled for text files
- **Static asset caching** with appropriate cache headers
- **Lightweight Alpine Linux** base image
- **Multi-stage builds** capability (can be extended)

## 🎓 Learning Objectives

This project demonstrates:
1. **Containerization**: Packaging an application with Docker
2. **Web Servers**: Configuring Nginx for static content
3. **Container Orchestration**: Preparing for Kubernetes deployment
4. **DevOps Practices**: Version control, documentation, automation

## 🔄 Next Steps in DevOps Journey

- [ ] Set up CI/CD pipeline with GitHub Actions
- [ ] Deploy to Kubernetes cluster
- [ ] Implement Infrastructure as Code with Terraform
- [ ] Add monitoring with Prometheus and Grafana
- [ ] Implement logging with ELK stack
- [ ] Add automated testing

## 🐛 Troubleshooting

### Common Issues

**Container won't start:**
```bash
docker logs my-portfolio
```

**Port already in use:**
```bash
# Use a different port
docker run -d -p 8081:80 --name my-portfolio devops-portfolio:latest
```

**Permission denied:**
```bash
# On Linux, you might need sudo
sudo docker build -t devops-portfolio:latest .
```

**Website not loading:**
- Check if container is running: `docker ps`
- Check container logs: `docker logs my-portfolio`
- Verify port mapping: `docker port my-portfolio`

## 📚 Resources

- [Docker Documentation](https://docs.docker.com/)
- [Nginx Documentation](https://nginx.org/en/docs/)
- [Docker Best Practices](https://docs.docker.com/develop/best-practices/)

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Feel free to fork this project and submit pull requests for improvements!

---

**Happy Learning! 🚀**

*This is part of my DevOps learning journey from fundamentals to mastery.*