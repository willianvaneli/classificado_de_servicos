import React from 'react';
import {render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'
import Nav from './index';

test('teste do Nav', () => {
    const { getByText } = render (<Nav/>)
    const titulo = getByText("Classificados")
    expect(titulo).toBeInTheDocument()

    const list_inicio = getByText("Início")
    expect(list_inicio).toBeInTheDocument()
    const list_entrar = getByText("Entrar")
    expect(list_entrar).toBeInTheDocument()
    const list_sobre = getByText("Sobre")
    expect(list_sobre).toBeInTheDocument()
    const list_contato = getByText("Contato")
    expect(list_contato).toBeInTheDocument()


})