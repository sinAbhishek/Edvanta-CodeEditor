import React, { useEffect } from 'react'
import { useState } from 'react';
import Editor from '@monaco-editor/react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useRef } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { AiFillHtml5 } from "react-icons/ai"
import { BiLogoJavascript, BiLogoCss3, BiSolidLockAlt } from "react-icons/bi"
import { FaCopy, FaSave } from "react-icons/fa"
import { IoSave } from "react-icons/io5"
import Modal from '@mui/material/Modal';
import "./home.css"

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
const Home = () => {
    const myref = useRef(null)
    const [open, setOpen] = React.useState(false);
    const [lock, setlock] = useState(false)
    const [filename, setfilename] = useState("")
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const files = {
        'script.js': {
            name: 'js',
            language: 'javascript',
            value: "//write your js",
        },
        'style.css': {
            name: 'css',
            language: 'css',
            value: "body {color:white}",
        },
        'index.html': {
            name: 'html',
            language: 'html',
            value: "<html></html>",
        },
    };
    const [fileName, setFileName] = useState('script.js');
    useEffect(() => {
        setvalue(files[fileName].value)
    }, [fileName])
    const [value, setvalue] = useState(files['script.js'].value)
    const file = files[fileName];
    const save = () => {
        var textBlob = new Blob([value], { type: 'text/plain' });
        const element = document.createElement("a");
        element.href = URL.createObjectURL(textBlob);
        element.download = `${filename.toLowerCase()}.${file.name}`;
        element.click()
        setfilename("")
        handleClose()
    }

    return (
        <div className='main'>
            <div className=" btnCont">
                <div className=" tabs">
                    <button disabled={fileName === 'script.js'} onClick={() => setFileName('script.js')}>
                        <BiLogoJavascript size={"1.5rem"} color='#fcdb03' />
                        script.js
                    </button>
                    <button disabled={fileName === 'style.css'} onClick={() => setFileName('style.css')}>
                        <BiLogoCss3 size={"1.5rem"} color='#03a1fc' />

                        style.css
                    </button>
                    <button disabled={fileName === 'index.html'} onClick={() => setFileName('index.html')}>
                        <AiFillHtml5 size={"1.5rem"} color='#fc7f03' />
                        index.html
                    </button>
                </div>
                <div className="features">
                    <CopyToClipboard text={value}>
                        <button><FaCopy size={"1.5rem"} color='#323436' />Copy</button>
                    </CopyToClipboard >
                    <button onClick={() => handleOpen()}><FaSave size={"1.5rem"} color='#323436' /> Save</button>
                    <button onClick={() => setlock(!lock)}><BiSolidLockAlt size={"1.5rem"} color='#323436' />{lock ? "Unlock" : "Lock"}</button>
                </div>

            </div>

            <Editor
                height="100vh"
                theme="vs-dark"
                path={file.name}
                defaultLanguage={file.language}
                defaultValue={file.value}
                onChange={(e) => setvalue(e)}
                options={{ readOnly: lock }}
            />
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className=" mod1">
                        <input onChange={(e) => setfilename(e.target.value)} type="text" placeholder='Write your file name' />
                        <button onClick={save}>Save</button>
                    </div>
                </Box>
            </Modal>
        </div>
    )
}

export default Home