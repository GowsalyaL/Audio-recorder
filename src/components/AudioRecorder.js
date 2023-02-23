import React, { createContext,  useState } from 'react'
import vmsg from 'vmsg'
import AudioWaveform from './AudioWaveform'

const recorder = new vmsg.Recorder({
  wasmURL: "https:unpkg.com/vmsg@0.3.0/vmsg.wasm",
})

export const RecordingContext = createContext('')

const AudioRecorder = () => {
  const [isRecording, setIsRecording] = useState(false)
  const [recording, setRecording] = useState('')

  const record = async () => {
    if (isRecording) {
      const blob = await recorder.stopRecording()
      setIsRecording(false)
      const url = window.URL.createObjectURL(blob)
      setRecording((url))
     }
    else {
      try {
        await recorder.initAudio()
        await recorder.initWorker()
        recorder.startRecording()
        setIsRecording(true)
      } catch { }
    }
  }
  const handleDelete = (e) => {
    setRecording('')
  }
console.log(recording);

  return (
    <div>
      <h1>Click mic to record</h1>
      <button onClick={record}>{isRecording ? "stop" : " Record"}</button>
      <audio src={recording} controls></audio>
      <button onClick={handleDelete}>delete</button>

      <RecordingContext.Provider value ={{recording , setRecording}}>
        <div className="listed">          
          {recording ? <AudioWaveform/> : ''}
        </div>
      </RecordingContext.Provider>


    </div>
  )
}

export default AudioRecorder