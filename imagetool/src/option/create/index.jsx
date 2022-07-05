import * as React from 'react'
import {Form, Input, Card, Button, InputNumber} from '@arco-design/web-react'
import { HexColorPicker } from 'react-colorful'

const FormItem = Form.Item

function getTextColor(bgColor) {
  if(parseInt(bgColor.slice(1), 16) > 2050000) {
    return '#000000'
  } else {
    return '#ffffff'
  }
}

function getImage (config) {
  console.log('test:', config)
  const { width: w, height: h, bg, text } = config;
  const width = typeof w === 'string' ? parseInt(w) : w;
  const height = typeof h === 'string' ? parseInt(h) : h;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, width, height);
  if(text) {
     ctx.fillStyle = getTextColor(bg);
     ctx.font = `${Math.round(Math.min(height / 3, width / 3))}px serif`;
     const measure = ctx.measureText(text);
     const {actualBoundingBoxAscent, actualBoundingBoxDescent, actualBoundingBoxLeft, actualBoundingBoxRight} = measure
     const textBoxWidth = actualBoundingBoxRight - actualBoundingBoxLeft;
     const textBoxHeight = actualBoundingBoxAscent - actualBoundingBoxDescent;
     ctx.fillText(text, width / 2 - textBoxWidth / 2 , height / 2 + textBoxHeight / 2);
  }
  // const canvasUrl = canvas.toDataURL("image/png");
  return new Promise((resolve, reject) => {
    canvas.toBlob((file) => {
      resolve(URL.createObjectURL(file))
    }, 'image/png')
  })
  // return canvasUrl
}

function getTime() {
  const now  = new Date();
  return `${now.getFullYear()}${now.getMonth() + 1}${now.getDate()}${now.getHours()}${now.getMinutes()}${now.getSeconds()}`
}

const CreateImage = () => {
  const [form] = Form.useForm()
  const [bg, setbg] = React.useState('#18e972')
  const [url, setUrl] = React.useState('')
  const [time, setTime] = React.useState('')

  const handleCreate = async() => {
    const value = form.getFieldsValue();
    const url = await getImage({...value, bg})
    setUrl(url)
    setTime(getTime())
  }

  return (
    <div style={{minHeight: '400px'}}>
      <Card title="图片参数">
        <Form form={form} initialValues={{height: 400, width: 375, text: 'image'}} layout="inline">
          <FormItem field="height" label="高度">
            <InputNumber suffix="像素" />
          </FormItem> 
          <FormItem field="width" label="宽度">
            <InputNumber suffix="像素" />
          </FormItem>
          <FormItem label="背景">
            <div style={{display: 'flex'}}>
              <Input value={bg} disabled />
              <div style={{position: 'relative', marginLeft: '6px'}} className="color-pick-container">
                <Button>
                  颜色选择器
                </Button>
                <HexColorPicker style={{position: 'absolute', top: 0, left: '100%'}} value={bg} onChange={setbg} className="color-picker"  />
              </div>
            </div>
          </FormItem>
          <FormItem label="文案" field="text">
            <Input  />
          </FormItem>
        </Form>
        <Button type="primary" onClick={handleCreate}>创建</Button>
        <style>
          {
            `
              .color-picker {
                z-index: 2;
                display: none;
              }
              .color-pick-container:hover .color-picker{
                display: flex
              }
            `
          }
        </style>
      </Card>
      {
        url && (
          <Card>
            <div>
              <small>点击图片下载到本地</small>
            </div>
            <a href={url.replace("image/png", "image/octet-stream")} download={`${time}.png`}>
              <img src ={url} />
            </a>
          </Card>
        )
      }
    </div>
  )
}

export default CreateImage