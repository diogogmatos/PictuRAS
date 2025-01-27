import os
import sys
import json
import datetime

import pytz

from PIL import Image, ImageEnhance

from utils.img_handler import Img_Handler
from utils.tool_msg import ToolMSG
import utils.env as env

class Brightness:
    def __init__(self):
        self._img_handler = Img_Handler()
        self._tool_msg = ToolMSG('picturas-brightness-tool-ms', 
                                 'brightness', 
                                 env.RABBITMQ_HOST, 
                                 env.RABBITMQ_PORT, 
                                 env.RABBITMQ_USERNAME, 
                                 env.RABBITMQ_PASSWORD)
        self._counter = 0
        self._codes = {
            'wrong_procedure': 1900,
            'error_processing': 1901
        }
        
    def adjust_brightness(self, img_path, store_img_path, brightness_factor):
        # Load the image
        img = self._img_handler.get_img(img_path)
        
        # Only convert palette images 
        if img.mode == 'P':
            img = img.convert('RGB')
        
        # adjust brightness
        enhancer = ImageEnhance.Brightness(img)
        new_img = enhancer.enhance(brightness_factor)
        
        # save image
        self._img_handler.store_img(new_img, store_img_path)

    def brightness_callback(self, ch, method, properties, body):
        json_str = body.decode()
        info = json.loads(json_str)

        msg_id = info['messageId']
        timestamp = datetime.datetime.fromisoformat(info['timestamp'])
        procedure = info['procedure']
        img_path = info['parameters']['inputImageURI']
        store_img_path = info['parameters']['outputImageURI']
        brightness_factor = info['parameters']['brightness']

        resp_msg_id = f'brightness-{self._counter}-{msg_id}'
        self._counter += 1

        if procedure != 'brightness':
            cur_timestamp = datetime.datetime.now(pytz.utc)
            processing_time = (cur_timestamp - timestamp).total_seconds() * 1000
            cur_timestamp = cur_timestamp.isoformat()

            self._tool_msg.send_msg(
                msg_id, 
                resp_msg_id, 
                cur_timestamp, 
                'error', 
                processing_time, 
                None,
                self._codes['wrong_procedure'], 
                "The procedure received does not fit into this tool", 
                img_path
            )
            return

        try:
            self.adjust_brightness(img_path, store_img_path, brightness_factor)

            cur_timestamp = datetime.datetime.now(pytz.utc)
            processing_time = (cur_timestamp - timestamp).total_seconds() * 1000
            cur_timestamp = cur_timestamp.isoformat()

            self._tool_msg.send_msg(
                msg_id,
                resp_msg_id,
                cur_timestamp,
                'success',
                processing_time,
                store_img_path
            )
        except Exception as e:
            cur_timestamp = datetime.datetime.now(pytz.utc)
            processing_time = (cur_timestamp - timestamp).total_seconds() * 1000
            cur_timestamp = cur_timestamp.isoformat()

            self._tool_msg.send_msg(
                msg_id,
                resp_msg_id,
                cur_timestamp,
                'error',
                processing_time,
                None,
                self._codes['error_processing'],
                str(e),
                img_path
            )

    def exec(self, args):
        while True:
            self._tool_msg.read_msg(self.brightness_callback)

if __name__ == "__main__":
    brightness_tool = Brightness()
    brightness_tool.exec(sys.argv)
