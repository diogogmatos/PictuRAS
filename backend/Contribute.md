# RabbitMQ

## Queues

- \<filter>: \<filter>\_queue
- project manager: 'project_queue'
- web socket: ws_queue

## Mensagens

### Mensagem genérica de ferramenta

```json
{
    "messageId": msg_id,
    "timestamp": timestamp,
    "procedure": tool,
    "parameters": {
        "inputImageURI": og_img_uri,
        "outputImageURI": new_img_uri,
        ... params
    }
}
```
