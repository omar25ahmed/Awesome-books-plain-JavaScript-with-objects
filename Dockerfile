# Use an official Node.js runtime as the base image
FROM node:lts-slim

# Update the package list and install Nginx
RUN apt-get update && apt-get install -y nginx

# Copy the content of the current directory to the default Nginx document root directory
COPY . /var/www/html/

# Switch to /var/www/html/
WORKDIR /var/www/html/

# Remove the default index.html file
RUN rm /var/www/html/index.nginx-debian.html

# Expose port 80 for web traffic
EXPOSE 80

# Start nginx and keep the container running
ENTRYPOINT service nginx start && tail -f /dev/null
