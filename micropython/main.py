from umqtt.simple import MQTTClient
from machine import Pin
from time import sleep
import ujson as json
import machine
import ubinascii
 
client_id = ubinascii.hexlify(machine.unique_id())
client = MQTTClient(client_id, '192.168.0.170', keepalive=30)
led = Pin(13, Pin.OUT)

def sub_callback(topic, msg):
    print('msg recvd..')
    try:
        msg = json.loads(msg)
        state = msg['state']
        led.value(state)
        client.publish('ledStatus', json.dumps({"led": 13, "state": led.value()}))
    except:
        print('Bad msg')


client.set_callback(sub_callback)
client.connect()
client.subscribe('led')
client.publish('ledStatus', json.dumps({"led": 13, "state": led.value()}))
    
while True:
    client.check_msg()
    print('checking...')
    sleep(1)
