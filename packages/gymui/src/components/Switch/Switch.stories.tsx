import { Meta, StoryObj } from '@storybook/react'
import { Switch } from './Switch'
import { ComponentProps } from 'react'
import { fn } from '@storybook/test'

type StoryProps = ComponentProps<typeof Switch>

const meta: Meta<StoryProps> = {
  component: Switch,
  tags: ['autodocs'],
  argTypes: {},
  args: {},
}

export default meta

type Story = StoryObj<StoryProps>

export const Primary: Story = {
  args: {
    label: 'Switch',
  },
  render: (args: any) => {
    return <Switch {...args} />
  },
}
