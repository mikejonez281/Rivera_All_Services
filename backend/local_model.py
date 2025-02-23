import subprocess
from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/chat', methods=['POST'])
def chat():
    user_message = request.json.get('message')
    model_response = subprocess.run(
        ['ollama', 'run', 'llama2', user_message],
        capture_output=True,
        text=True
    )
    return jsonify({'response': model_response.stdout.strip()})

if __name__ == '__main__':
    app.run(host='localhost', port=5000)
