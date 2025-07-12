import type { Meta, StoryObj } from '@storybook/vue3'
import { ZelCollapse, ZelCollapseItem } from "@relic-yangzheng/z-element";

type Story = StoryObj<typeof ZelCollapse>;

const meta: Meta<typeof ZelCollapse> = {
  title: 'Components/Collapse',
  component: ZelCollapse,
  subcomponents: { ZelCollapseItem },
  tags: ['autodocs'],
}

export const Default: Story = {
  render: (args: any) => ({
    components: {
      ZelCollapse,
      ZelCollapseItem,
    },
    setup() {
      return {
        args,
      };
    },
    template: `
    <zel-collapse v-bind="args">
      <zel-collapse-item name="a" title="Title a">
        <div>this is content a</div>
      </zel-collapse-item>
      <zel-collapse-item name="b" title="Title b">
        <div>this is content b</div>
      </zel-collapse-item>
      <zel-collapse-item name="c" title="Title c disabled" disabled>
        <div>this is content c</div>
      </zel-collapse-item>
    </zel-collapse>
    `
  }),
  args: {
    accordion: true,
    modelValue: ['a']
  },
}

export default meta