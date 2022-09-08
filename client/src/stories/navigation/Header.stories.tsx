import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Header } from '../../components/navigation/Header';
import { BrowserRouter as Router } from "react-router-dom";


export default {
  component: Header,
  title: 'Components/Navigation/Header',
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = (args) => (
  <Router>
    <Header {...args} />    
  </Router>
);



export const Default = Template.bind({});
Default.args = {  };