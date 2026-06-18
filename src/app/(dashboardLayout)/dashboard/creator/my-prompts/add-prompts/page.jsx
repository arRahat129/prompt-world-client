import React from 'react';
import Link from "next/link";
import { Button, Input } from "@heroui/react";
import { FiArrowLeft, FiLayers, FiCpu, FiTag, FiFileText } from "react-icons/fi";
import AddPromptForm from './AddPromptForm';

export default function AddNewPrompt() {

    return (
        <div>
            <AddPromptForm />
        </div>
    );
}