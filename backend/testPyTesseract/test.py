from PIL import Image
import pytesseract

# 画像ファイルを開く
image = Image.open('test.png')

# 画像から文字を抽出
text = pytesseract.image_to_string(image)
print(text)