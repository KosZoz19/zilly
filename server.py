#!/usr/bin/env python3
"""
Simple HTTP server for serving static files
"""
import http.server
import socketserver
import os

PORT = 5000
HOST = "0.0.0.0"

class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Add cache-control headers to prevent caching issues
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

if __name__ == "__main__":
    # Change to the directory containing the HTML files
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    
    print(f"Starting server on {HOST}:{PORT}")
    print(f"Serving files from: {os.getcwd()}")
    
    with socketserver.TCPServer((HOST, PORT), CustomHTTPRequestHandler) as httpd:
        print(f"Server running at http://{HOST}:{PORT}/")
        httpd.serve_forever()