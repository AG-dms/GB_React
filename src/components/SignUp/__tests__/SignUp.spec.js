import React from "react";
import SignUp from "../SignUp";
import {
  render
} from '@testing-library/react'

describe('SignUp', () => {
  it('matches snapshot', () => {
    const component = render( < SignUp / > )
    expect(component).toMatchInlineSnapshot()
  });
})