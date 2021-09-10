import React from 'react';
import {render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'
import Cad from './index';

test('teste do cadastrp de anunciante', () => {
    const { getByPlaceholderText } = render (<Cad/>)
    const nome = getByPlaceholderText("Nome")
    expect(nome).toBeInTheDocument()

    const email = getByPlaceholderText("Email")
    expect(email).toBeInTheDocument()
    const razao_social = getByPlaceholderText("Razao Social")
    expect(razao_social).toBeInTheDocument()
    const telefone = getByPlaceholderText("Telefone")
    expect(telefone).toBeInTheDocument()
    const cidade = getByPlaceholderText("Cidade")
    expect(cidade).toBeInTheDocument()
    const estado = getByPlaceholderText("Estado")
    expect(estado).toBeInTheDocument()
    const senha = getByPlaceholderText("Senha")
    expect(senha).toBeInTheDocument()


})