#!/usr/bin/env python3
"""
Simple HTTP server to serve static files on Cloud Run
"""
import http.server
import socketserver
import os
from urllib.parse import urlparse

PORT = int(os.environ.get('PORT', 8080))

class Handler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        # Parse the URL path
        parsed_path = urlparse(self.path)
        path = parsed_path.path
        
        # Serve index.html for root path
        if path == '/':
            self.path = '/index.html'
            
        # Serve index.html for directory paths ending with /
        elif path.endswith('/'):
            self.path = path + 'index.html'
            
        return super().do_GET()

if __name__ == "__main__":
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print(f"Serving at http://0.0.0.0:{PORT}")
        httpd.serve_forever()
