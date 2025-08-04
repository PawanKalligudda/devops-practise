# Use the official Nginx image based on Alpine Linux for smaller size
FROM nginx:alpine

# Set the working directory inside the container
WORKDIR /usr/share/nginx/html

# Remove the default Nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy our website files to the Nginx html directory
COPY index.html /usr/share/nginx/html/
COPY styles.css /usr/share/nginx/html/
COPY script.js /usr/share/nginx/html/

# Copy custom Nginx configuration (optional)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 to the outside world
EXPOSE 80

# Add labels for better container management
LABEL maintainer="devops-learner@example.com"
LABEL description="DevOps Learning Portfolio - Static Website"
LABEL version="1.0"

# Health check to ensure the container is running properly
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3     CMD curl -f http://localhost/ || exit 1

# Start Nginx when the container launches
# The daemon off directive tells Nginx to stay in the foreground
CMD ["nginx", "-g", "daemon off;"]