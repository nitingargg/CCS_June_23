from transformers import TrOCRProcessor, VisionEncoderDecoderModel
import requests
from PIL import Image
import cv2
import numpy as np

def transcriber(image):

  processor = TrOCRProcessor.from_pretrained("microsoft/trocr-base-handwritten")
  model = VisionEncoderDecoderModel.from_pretrained("microsoft/trocr-base-handwritten")

  pixel_values = processor(image, return_tensors="pt").pixel_values
  generated_ids = model.generate(pixel_values)

  generated_text = processor.batch_decode(generated_ids, skip_special_tokens=True)[0]

  return generated_text

def image_reader(path):

  image = cv2.imread(path)
  image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
  h, w, c = image.shape
  if w > 700:
      new_w = 700
      ar = w/h
      new_h = int(new_w/ar)
      image = cv2.resize(image, (new_w, new_h), interpolation = cv2.INTER_AREA)
  return image
    

def thresholding(image):
    img_gray = cv2.cvtColor(image,cv2.COLOR_BGR2GRAY)
    ret,thresh = cv2.threshold(img_gray,100,255,cv2.THRESH_BINARY_INV)
    return thresh
  
def sentence_fetcher(path):
  img = image_reader(path)
  thresh_img = thresholding(img)
  kernel = np.ones((3,85), np.uint8)
  dilated = cv2.dilate(thresh_img, kernel, iterations = 1)
  (contours, heirarchy) = cv2.findContours(dilated.copy(), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)
  sorted_contours_lines = sorted(contours, key = lambda ctr : cv2.boundingRect(ctr)[1])
  sentence_coordinates = []
  for countour in sorted_contours_lines:
    
    x,y,w,h = cv2.boundingRect(countour)
    cv2.rectangle(img, (x,y), (x+w, y+h), (40, 100, 250), 2)
    sentence_coordinates.append([x,y,x+w,y+h])
  return sentence_coordinates


def reader(path):
  sentence_coordinates = sentence_fetcher(path)
  img = image_reader(path)
  content = ''
  for i in range(len(sentence_coordinates)):
    sentence = sentence_coordinates[i]
    region_of_interest = img[sentence[1]:sentence[3], sentence[0]:sentence[2]]
    text = transcriber(region_of_interest)
    content += text
    content += '/n'
  return content