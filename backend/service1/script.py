import pika

# RabbitMQ connection details
RABBITMQ_HOST = 'rabbitmq'
RABBITMQ_USERNAME = 'user'  # Replace with your RabbitMQ username
RABBITMQ_PASSWORD = 'password'  # Replace with your RabbitMQ password
QUEUE_NAME = 'test_queue'

# Function to publish a message
def publish_message():
    # Setup authentication
    credentials = pika.PlainCredentials(RABBITMQ_USERNAME, RABBITMQ_PASSWORD)
    connection = pika.BlockingConnection(
        pika.ConnectionParameters(host=RABBITMQ_HOST, credentials=credentials)
    )
    channel = connection.channel()
    channel.queue_declare(queue=QUEUE_NAME)  # Declare a queue
    message = "Hello, RabbitMQ!"
    channel.basic_publish(exchange='', routing_key=QUEUE_NAME, body=message)
    print(f" [x] Sent '{message}'")
    connection.close()

# Function to consume a message
def consume_message():
    # Setup authentication
    credentials = pika.PlainCredentials(RABBITMQ_USERNAME, RABBITMQ_PASSWORD)
    connection = pika.BlockingConnection(
        pika.ConnectionParameters(host=RABBITMQ_HOST, credentials=credentials)
    )
    channel = connection.channel()
    channel.queue_declare(queue=QUEUE_NAME)  # Declare a queue

    def callback(ch, method, properties, body):
        print(f" [x] Received '{body.decode()}'")
        connection.close()  # Close after receiving the first message

    channel.basic_consume(queue=QUEUE_NAME, on_message_callback=callback, auto_ack=True)
    print(' [*] Waiting for messages. To exit press CTRL+C')
    channel.start_consuming()

# Publish and consume
if __name__ == '__main__':
    publish_message()
    consume_message()
