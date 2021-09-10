import React from 'react';
import {render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'
import Home from './index';

test('teste de filtro', () => {
    const { getByTestId } = render (<Home/>)
    const btnCategoria = getByTestId("categoria")
    expect(btnCategoria).toBeInTheDocument()

    const slider = getByTestId("slider-content")
    expect(slider).toBeInTheDocument()
})