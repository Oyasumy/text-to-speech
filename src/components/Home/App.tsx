import React from 'react'
import { useRef, useState } from 'react'
import { handlePostTextToSpeech } from '../../apis/textToSpeech'
import { voidData, speechRead } from '../../constants/value'
import { Input, Select, Button } from 'antd'
import { AudioOutlined, StopOutlined } from '@ant-design/icons'
import './App.scss'

const { TextArea } = Input
const { Option } = Select

const Demo: React.FC = () => {
  const [value, setValue] = useState<string>('')
  const [maxText] = useState<number>(20)

  const [voidPerson, setVoidPerson] = useState<number>(0)
  const [speech, setSpeech] = useState<number>(1.0)

  const [source, setSource] = useState<string>('')
  const ref = useRef<HTMLAudioElement | null>(null)
  const onChange = ({ target: { value } }: { target: { value: string } }) => {
    // Check max Word
    if (value.split(' ').length > maxText) return

    setValue(value)
  }
  const handleVoidChange = (value: string) => {
    setVoidPerson(parseFloat(value))
  }

  const handleSpeechChange = (value: number) => {
    setSpeech(value)
  }

  const checkAudioIsPlaying = () => {
    if (!ref.current?.paused) {
      ref.current?.pause()
    } else {
      ref.current?.play()
    }
  }

  const callApi = async () => {
    console.log('comm-- ', value, voidPerson, speech)

    const response = await handlePostTextToSpeech(value, voidPerson, speech)
    console.log('res', response)
    if (response && response?.error_code === 0) {
      setSource(response.data.url);
      ref.current?.play()
    }
  }

  return (
    <div className="main-container">
      <TextArea
        value={value}
        onPaste={(e) => {
          document.execCommand('paste')
          setValue(value + e.clipboardData.getData('Text'))
          // console.log('vv', e.target);
        }}
        onChange={(e) => onChange(e)}
        placeholder="Controlled autosize"
        autoSize={{ maxRows: 7, minRows: 7 }}
        rows={7}
      />
      <div className="button-group">
        {/* Select Void */}
        <Select
          defaultValue={voidData[0][0]}
          className="select-style"
          onChange={(e) => handleVoidChange(e.toString())}
        >
          {voidData.map((voidRead) => (
            <Option
              value={voidRead[1]}
              key={voidRead[0]}
              children={voidRead[0]}
            ></Option>
          ))}
        </Select>
        {/* Select Speech Read */}
        <Select
          defaultValue={speechRead[1]}
          className="select-style"
          onChange={(e) => handleSpeechChange(e)}
        >
          {speechRead.map((speech) => (
            <Option value={speech} key={speech} children={speech}></Option>
          ))}
        </Select>
        {/* Button Stop */}
        <Button
          className="button-style"
          icon={<StopOutlined />}
          type="ghost"
          disabled={source.length === 0 ? true : false}
          onClick={() => checkAudioIsPlaying()}
        >
          {ref.current?.paused ? 'Dừng' : 'Tiếp tục'}
        </Button>
        {/* Button Start */}
        <Button
          className="button-style"
          type="primary"
          icon={<AudioOutlined />}
          disabled={value.length === 0 ? true : false}
          onClick={() => callApi()}
        >
          Đọc
        </Button>
      </div>
      <audio ref={ref} id="audio" src={source}></audio>
    </div>
  )
}

export default Demo
