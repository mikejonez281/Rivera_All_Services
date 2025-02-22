from flask import Flask, request, jsonify
from transformers import LlamaTokenizer, LlamaForCausalLM

app = Flask(__name__)

# Load model and tokenizer
tokenizer = LlamaTokenizer.from_pretrained("llama-2-7b")
model = LlamaForCausalLM.from_pretrained("llama-2-7b")

@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    prompt = data.get("message")

    inputs = tokenizer(prompt, return_tensors="pt")
    outputs = model.generate(inputs['input_ids'], max_length=100)

 # Process the incoming message
    message = request.json.get('message')  # Get message from the body
    response = "This is a response to: " + message  # Example response
    return jsonify({"response": response})


if __name__ == "__main__":
    app.run(debug=True, port=5000)
