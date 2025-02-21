import sys
from transformers import LlamaTokenizer, LlamaForCausalLM

# Load the tokenizer and model
tokenizer = LlamaTokenizer.from_pretrained("llama-2-7b")  # Use your chosen model path or identifier
model = LlamaForCausalLM.from_pretrained("llama-2-7b")

# Get the input prompt from the command line arguments
input_text = sys.argv[1]  # Takes the first argument passed from the Node.js server

# Tokenize input text
inputs = tokenizer(input_text, return_tensors="pt")

# Generate text
outputs = model.generate(inputs['input_ids'], max_length=100)

# Decode and print generated text
generated_text = tokenizer.decode(outputs[0], skip_special_tokens=True)

# Print the generated text to return it to the Node.js server
print(generated_text)
