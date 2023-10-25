import { PageIntro } from './PageIntro'
import { Button } from './Button'
import { FadeIn } from './FadeIn'
import { Container } from './Container'
import { TextInput } from './TextInput';
import { postPassword } from '@/lib/password';
import { useState } from 'react';




export function EnterPassword() {

    const [inputValue, setInputValue] = useState('');
    const [showAlert, setShowAlert] = useState(false);


    const handleButtonClick = (e: React.SyntheticEvent) => {
        e.preventDefault()

        fetch('/api/password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ password: inputValue }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (!data.isValidated) {
                    setShowAlert(true)
                }
                location.reload()
            })
            .catch((error) => {
                console.error(error);
            });



        // if (!alert) return setShowAlert(true)
    };

    return (
        <>
            <article className="mt-24 sm:mt-32 lg:mt-40">
                <header>
                    <PageIntro eyebrow='This use case is protected' title='Enter password' centered>
                    </PageIntro>
                    <FadeIn className="lg:order-last">
                        <Container>
                            <form className='flex flex-col items-center w-full'>
                                <div className="w-full px-64 isolate mt-6 -space-y-px rounded-2xl bg-white/50">
                                    <TextInput label="Password" name="password" autoComplete="password" value={inputValue} onChange={(e) => setInputValue(e.target.value)}
                                        placeholder="Enter text" />
                                </div>
                                {showAlert && <h6 className='text-red-600'>Wrong password</h6>}
                                <button type="button" className="mt-10 text-xl px-16 py-4 inline-flex rounded-full font-semibold transition bg-neutral-950 text-white hover:bg-neutral-800" onClick={handleButtonClick}>
                                    Submit
                                </button>
                            </form>
                        </Container>
                    </FadeIn>
                </header>
            </article >
        </>
    )
}
