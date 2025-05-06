"use client"
import { useState, useEffect } from 'react';
import Footer from '@/component/layout/Footer';
import { useRouter } from 'next/navigation';
import Header from "@/component/layout/Header";
import React from 'react';
import Link from 'next/link';
import PlayerForm from '@/component/player'

const Page = () => {
    const onSubmit = () => {

    };

    return (
        <div>
            <Header/>
            <PlayerForm/>
            <Footer/>
        </div>
    );
};

export default Page;
