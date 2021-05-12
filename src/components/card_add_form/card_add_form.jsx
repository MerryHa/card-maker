import React, { memo, useRef, useState } from 'react';
import Button from '../button/button';
import ImgBox from '../img_box/img_box';
import styles from './card_add_form.module.css';
let card = null;

const CardAddForm = memo(({ FileInput, onAdd }) => {
    const formRef = useRef();
    const nameRef = useRef();
    const companyRef = useRef();
    const themeRef = useRef();
    const phoneRef = useRef();
    const emailRef = useRef();
    const messageRef = useRef();
    const [file, setFile] = useState({ fileName: null, fileURL: null });
    const [avatar, setAvatar] = useState(false);

    const onFileChange = file => {
        setFile({
            fileName: '✔ Uploaded',
            fileURL: file.url,
        });
        card = null;
    }
    const setDefault = (e) => {
        e.preventDefault();
        setFile({
            fileName: '',
            fileURL: '',
        })
    };
    const onSubmit = (event) => {
        event.preventDefault();
        const base = {
            id: Date.now(), //uuid
            name: nameRef.current.value || '',
            company: companyRef.current.value || '',
            theme: themeRef.current.value,
            phone: phoneRef.current.value || '',
            email: emailRef.current.value || '',
            message: messageRef.current.value || '',
        }
        if (card) {
            card = {
                ...base,
                ...card
            }
        } else {
            card = {
                ...base,
                fileName: file.fileName || '',
                fileURL: file.fileURL || '',
                color: '',
            }
        }
        formRef.current.reset();
        setFile({ fileName: null, fileURL: null });
        onAdd(card);
    };
    const onClickGallery = (e) => {
        e.preventDefault();
        onChangeAvatar();
    }
    const onChangeAvatar = (boolean, avatarObject) => {
        setAvatar(boolean || !avatar);
        avatarObject && updateCard(avatarObject)
    }
    const updateCard = (avatarObject) => {
        card = {
            fileName: '',
            fileURL: avatarObject.src,
            color: avatarObject.color,
        };
    }
    return (
        <form ref={formRef} className={styles.form}>
            <input
                ref={nameRef}
                className={styles.input}
                type="text"
                name="name"
                placeholder="Name"
                autoComplete="off"
            />
            <input
                ref={companyRef}
                className={styles.input}
                type="text"
                name="company"
                placeholder="Company"
                autoComplete="off"
            />
            <select ref={themeRef} className={styles.select} name="theme" placeholder="Theme">
                <option>light</option>
                <option>dark</option>
                <option>colorful</option>
            </select>
            <input
                ref={phoneRef}
                className={styles.input}
                type="text"
                name="phone"
                placeholder="Phone Number"
                autoComplete="off"
            />
            <input
                ref={emailRef}
                className={styles.input}
                type="text"
                name="email"
                placeholder="E-mail"
                autoComplete="off"
            />
            <textarea
                ref={messageRef}
                className={styles.textarea}
                name="message"
                placeholder="Message"
            >
            </textarea>
            <div className={styles.file}>
                <FileInput name={file.fileName} onFileChange={onFileChange} />
                <button
                    className={styles.return}
                    onClick={setDefault}
                >
                    <i class="fas fa-undo-alt"></i>
                </button>
                <button className={styles.gallery} onClick={onClickGallery}>
                    <i class="fas fa-images"></i>
                </button>
            </div>
            <Button name='Add' onClick={onSubmit} />
            {avatar && <ImgBox onChangeAvatar={onChangeAvatar} />}
        </form>
    );
});

export default CardAddForm;