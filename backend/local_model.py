from transformers import LlamaTokenizer, LlamaForCausalLM

# Load the tokenizer and model
tokenizer = LlamaTokenizer.from_pretrained("llama-2-7b")  # Use your chosen model path or identifier
model = LlamaForCausalLM.from_pretrained("llama-2-7b")

# Example: Generate text
input_text = "Once upon a time"
inputs = tokenizer(input_text, return_tensors="pt")
outputs = model.generate(inputs['input_ids'], max_length=100)

# Decode and print generated text
generated_text = tokenizer.decode(outputs[0], skip_special_tokens=True)
print(generated_text)

