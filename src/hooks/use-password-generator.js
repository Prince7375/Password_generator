import { useState } from "react";

const usePasswordGenerator = () => {
    const [password, setpassword] = useState("");
    const [errorMessage, seterrorMessage] = useState("");

    const generatePassword = (checkboxData, length) => {
        let charset = "",
        generatedPassword = "";

        const selectedOption = checkboxData.filter((checkbox) => checkbox.state)
        
        if (selectedOption.length === 0) {
            seterrorMessage("Select at least one option.");
            setpassword("");
            return;
            }

        selectedOption.forEach((option) => {
            switch(option.title) {
                case "Include Uppercase Letters":
                    charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
                    break;
                case "Include Lowercase Letters":
                    charset += "abcdefghijklmnopqrstuvwxyz";
                    break;
                case "Include Numbers":
                    charset += "0123456789";
                    break;
                case "Include Symbols":
                    charset += "!@#$%^&*()";
                    break;
                default:
                    break;
            }
        });

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random()*charset.length);
            generatedPassword += charset[randomIndex];            
        }

        setpassword(generatedPassword);
        seterrorMessage("");
    };

    return { password, errorMessage, generatePassword };
};



export default usePasswordGenerator;