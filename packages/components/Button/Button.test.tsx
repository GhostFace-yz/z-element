import {describe, it, expect, vi, test} from 'vitest'
import {mount} from "@vue/test-utils";
import Button from "./Button.vue";
import ButtonGroup from "./ButtonGroup.vue";
import ZelIcon from "../Icon/Icon.vue";

describe("Button.vue", () => {
  // Props: type
  it("should has the correct type class when type prop is set", () => {
    const types = ["primary", "success", "warning", "danger", "info"];
    types.forEach((type) => {
      const wrapper = mount(Button, {
        props: { type: type as any },
      });
      expect(wrapper.classes()).toContain(`zel-button--${type}`);
    });
  });

  // Props: size
  it("should has the correct size class when size prop is set", () => {
    const sizes = ["large", "default", "small"];
    sizes.forEach((size) => {
      const wrapper = mount(Button, {
        props: { size: size as any },
      });
      expect(wrapper.classes()).toContain(`zel-button--${size}`);
    });
  });

  // Props: plain, round, circle
  it.each([
    ["plain", "is-plain"],
    ["round", "is-round"],
    ["circle", "is-circle"],
    ["disabled", "is-disabled"],
    ["loading", "is-loading"],
  ])(
    "should has the correct class when prop %s is set to true",
    (prop, className) => {
      const wrapper = mount(Button, {
        props: { [prop]: true },
        global: {
          stubs: ["ErIcon"],
        },
      });
      expect(wrapper.classes()).toContain(className);
    }
  );

  it("should has the correct native type attribute when native-type prop is set", () => {
    const wrapper = mount(Button, {
      props: { nativeType: "submit" },
    });
    expect(wrapper.element.tagName).toBe("BUTTON");
    expect((wrapper.element as any).type).toBe("submit");
  });

  it.each([
    ["withoutThrottle", false],
    ["withThrottle", true],
  ])("emits click event %s", async (_, useThrottle) => {
    const clickSpy = vi.fn();
    const wrapper = mount(() => (
      <Button
       onClick={clickSpy}
       {...{
         useThrottle,
         throttleDuration: 400,
       }}
      >
      </Button>
    ));
    await wrapper.get('button').trigger('click');
    await wrapper.get('button').trigger('click');
    await wrapper.get('button').trigger('click');
    expect(clickSpy).toBeCalledTimes(useThrottle? 1: 3)
  })
  // Props: tag
  it("should renders the custom tag when tag prop is set", () => {
    const wrapper = mount(Button, {
      props: { tag: "a" },
    });
    expect(wrapper.element.tagName.toLowerCase()).toBe("a");
  });

  // Events: click
  it("should emits a click event when the button is clicked", async () => {
    const wrapper = mount(Button, {});
    await wrapper.trigger("click");
    expect(wrapper.emitted().click).toHaveLength(1);
  });

  // loading state
  // it('should display loading icon and not emit click event when button is loading', async () => {
  //   const wrapper = mount(Button, {
  //     global: {
  //       stubs: ["ZelIcon"],
  //     }
  //   })
  //   const iconElement = wrapper.findComponent(ZelIcon)
  //
  //   expect(wrapper.find('.loading-icon').exists()).toBe(true);
  //   expect(iconElement.exists()).toBeTruthy();
  //   expect(iconElement.attributes('icon')).toBe('spinner');
  //   await wrapper.trigger("click");
  //   expect(wrapper.emitted('click')).toBeUndefined();
  // });
})

describe("ButtonGroup.vue", () => {
  test('basic button group', async () => {
    const wrapper = mount(() => (
      <ButtonGroup>
        <Button>button 1</Button>
        <Button>button 2</Button>
      </ButtonGroup>
    ))
    expect(wrapper.classes()).toContain('zel-button-group');
  });

  test("button group size", () => {
    const sizes = ["large", "default", "small"];
    sizes.forEach((size) => {
      const wrapper = mount(() => (
        <ButtonGroup size={size as any }>
          <Button>button 1</Button>
          <Button>button 2</Button>
        </ButtonGroup>
      ))

      const buttonWrapper = wrapper.findComponent(Button);
      expect(buttonWrapper.classes()).toContain(`zel-button--${size}`);
    })
  })

  test('button group type', () => {
    const types = ['primary', 'success', 'warning', 'danger', 'info'];
    types.forEach((type) => {
      const wrapper = mount(() => (
        <ButtonGroup type={type}>
          <Button>button 1</Button>
          <Button>button 2</Button>
        </ButtonGroup>
      ))

      const buttonWrapper = wrapper.findComponent(Button);
      expect(buttonWrapper.classes()).toContain(`zel-button--${type}`);
    })
  })

  test('button group disabled', () => {
    const wrapper = mount(() => (
      <ButtonGroup disabled>
        <Button>button 1</Button>
        <Button>button 2</Button>
      </ButtonGroup>
    ))

    const buttonWrapper = wrapper.findComponent(Button);
    expect(buttonWrapper.classes()).toContain(`is-disabled`);
  })
})