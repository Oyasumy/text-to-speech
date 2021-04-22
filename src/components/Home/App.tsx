import React, { useEffect } from 'react'
import { useRef, useState } from 'react'
import { Input, Select, Button } from 'antd'
import { AudioOutlined, StopOutlined } from '@ant-design/icons'
import anime from 'animejs'

import './App.scss'
import { handlePostTextToSpeech } from '../../apis/textToSpeech'
import { voidData, speechRead } from '../../constants/value'
import { VALUE_BUTTON } from '../../hook/type'

const { TextArea } = Input
const { Option } = Select

const Demo: React.FC = () => {
  // Create State
  const [value, setValue] = useState<string>('')
  const [maxText] = useState<number>(2000)

  const [voidPerson, setVoidPerson] = useState<number>(1)
  const [speech, setSpeech] = useState<number>(1.0)

  const [textButton, setTextButton] = useState<string>(VALUE_BUTTON.STOP)

  const [source, setSource] = useState<string>('')
  // Create Ref
  const ref = useRef<HTMLVideoElement | null>(null)

  // Function
  const onChange = ({ target: { value } }: { target: { value: string } }) => {
    // Check max Word
    if (value.split(' ').length > maxText) return

    setValue(value)
  }

  // Set value Void Person
  const handleVoidChange = (value: string) => {
    setVoidPerson(parseFloat(value))
  }

  // Set value Speech
  const handleSpeechChange = (value: number) => {
    setSpeech(value)
  }

  // Action Button
  const checkAudioIsPlaying = () => {
    // If audio paused = false => set pause = true, set text button = Tiep Tuc
    // Else set text button = Dung, set audio = play
    if (ref.current?.paused === false) {
      ref.current?.pause()
      setTextButton(VALUE_BUTTON.CONTINUE)
    } else {
      setTextButton(VALUE_BUTTON.STOP)
      ref.current?.play()
    }
  }

  // Action Button Doc
  const callApi = async () => {
    // Set text button = Dung
    setTextButton(VALUE_BUTTON.STOP)
    // setSource("")

    // Call API get file audio type WAV
    const response = await handlePostTextToSpeech(value, voidPerson, speech)

    // Check data response was success
    if (parseInt(response?.error_code.toString()) === 0) {
      setSource(response.data.url)

      // Function play() is a promise so I used then() and catch()
      if(ref.current){
        ref.current.pause();
        ref.current.load();
        ref.current.play();
    }
    }
  }

  // Function Init Animation background
  useEffect(() => {
    const container = document.querySelector<Element>('.container-block')

    for (let i = 0; i < 5; i++) {
      const blocks = document.createElement('div')

      blocks.classList.toggle('glass-morphine')
      container?.appendChild(blocks)
    }

    function animatedBlock() {
      anime({
        targets: '.glass-morphine',
        translateX: function () {
          return anime.random(-700, 700)
        },
        translateY: function () {
          return anime.random(-700, 700)
        },
        scale: function () {
          return anime.random(1, 3)
        },
        easing: 'linear',
        duration: 3000,
        delay: anime.stagger(5),
        complete: animatedBlock,
      })
    }
    // animatedBlock()
  }, [])
  return (
    <div className="main-container">
      {/* Text Area */}
      <TextArea
        value={value}
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
        {/* Media Audio */}
      </div>
      {/* {source === '' ? null : ( */}
      <audio
        // name="media"
       
        controls
        ref={ref}
        // src={source || ''}
        className="mt-10"
      >
        <source src={source || ''} type="audio/wav" />
      </audio>
      {/* )} */}
      <div className="container-block"></div>
    </div>
  )
}

export default Demo
