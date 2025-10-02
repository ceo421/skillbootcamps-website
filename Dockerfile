FROM nginx:alpine

# Copy website files to nginx html directory
COPY . /usr/share/nginx/html/

# Expose port 8080 (Cloud Run default)
EXPOSE 8080

# Configure nginx for Cloud Run
RUN sed -i 's/listen.*80;/listen 8080;/' /etc/nginx/conf.d/default.conf

# Start nginx
CMD ["nginx", "-g", "daemon off;"]

