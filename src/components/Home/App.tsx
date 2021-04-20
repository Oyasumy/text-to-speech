import React, { useEffect } from 'react'
import { useRef, useState } from 'react'
import { handlePostTextToSpeech } from '../../apis/textToSpeech'
import { voidData, speechRead } from '../../constants/value'
import { Input, Select, Button } from 'antd'
import {
  AudioOutlined,
  DownloadOutlined,
  StopOutlined,
} from '@ant-design/icons'
import './App.scss'

const { TextArea } = Input
const { Option } = Select

enum VALUE_BUTTON {
  CONTINUE = 'Tiếp tục',
  STOP = 'Dừng',
}
const Demo: React.FC = () => {
  const [value, setValue] = useState<string>('')
  const [maxText] = useState<number>(2000)

  const [voidPerson, setVoidPerson] = useState<number>(1)
  const [speech, setSpeech] = useState<number>(1.0)

  const [textButton, setTextButton] = useState<string>(VALUE_BUTTON.STOP)

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
      setTextButton(VALUE_BUTTON.CONTINUE)
    } else {
      setTextButton(VALUE_BUTTON.STOP)
      ref.current?.play()
    }
  }

  const callApi = async () => {
    setTextButton(VALUE_BUTTON.STOP)
    setSource('')
    console.log('comm-- ', value, voidPerson, speech)

    const response = await handlePostTextToSpeech(value, voidPerson, speech)
    console.log('res', response)
    if (parseInt(response?.error_code.toString()) === 0) {
      console.log('set ok')

      setSource(response.data.url)
    }
  }

  useEffect(() => {
    if (source) {
      console.log('speak ok', source)

      ref.current?.play()
    } else {
      console.log('speak pause')

      ref.current?.pause()
    }
  }, [source])
  return (
    <div className="main-container">
      <TextArea
        value={value}
        onChange={(e) => onChange(e)}
        placeholder="Controlled autosize"
        autoSize={{ maxRows: 7, minRows: 7 }}
        rows={7}
      />
      <audio
        controls
        ref={ref}
        id="audio"
        src={source}
        className="mt-10"
      ></audio>
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
          disabled={source.length === 0 || value.length === 0 ? true : false}
          onClick={() => checkAudioIsPlaying()}
        >
          {textButton}
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
        {/* Button Download */}
        {/* <Button
          icon={<DownloadOutlined />}
          type="dashed"
          danger
          block
          className="mt-10"
          onClick={() => downloadFile()}
        >
          DownLoad
        </Button> */}
      </div>
    </div>
  )
}

export default Demo
