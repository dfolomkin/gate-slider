const animationContainerId = '#container_01';
const targetInputId = '#input_02';

const updateInput = (rotate) => {
  const value = 100 - (Math.round(rotate < -4 ? 0 : rotate) + 4) * 5;
  const input = document.body.querySelector(targetInputId);

  input.value = value;
};

const getInitRotate = () => {
  const input = document.body.querySelector(targetInputId);
  const initRotate = (100 - Number(input.value)) / 5 - 4;

  return initRotate;
};

const initState = {
  lever: {
    rotate: getInitRotate(),
  },
  body: {
    heightScale: 1,
  },
  head: {
    y: 103,
  },
  armRight1: {
    x: 33,
    y: 84,
    rotate: 0,
    widthScale: 1,
  },
  armRight2: {
    x: 41,
    y: 47,
    rotate: 0,
  },
  armLeft1: {
    x: 87,
    y: 83,
    rotate: 0,
    widthScale: 1,
  },
  armLeft2: {
    x: 85,
    y: 57,
    rotate: 0,
  },
};

const createLayout = (container) => {
  const gateBg = document.createElement('div');
  gateBg.id = 'gate_bg';
  gateBg.style.position = 'relative';
  gateBg.style.width = '270px';
  gateBg.style.height = '218px';
  gateBg.style.background = "url('assets/open_close_gate_01_bg.png')";

  const gateHead = document.createElement('div');
  gateHead.id = 'gate_head';
  gateHead.style.position = 'absolute';
  gateHead.style.left = '53px';
  gateHead.style.top = '103px';
  gateHead.style.width = '22px';
  gateHead.style.height = '18px';
  gateHead.style.background = "url('assets/open_close_gate_01_0008_head.png')";

  const gateBody = document.createElement('div');
  gateBody.id = 'gate_body';
  gateBody.style.position = 'absolute';
  gateBody.style.left = '45px';
  gateBody.style.top = '116px';
  gateBody.style.width = '75px';
  gateBody.style.height = '57px';
  gateBody.style.background = "url('assets/open_close_gate_01_0001_body.png')";
  gateBody.style.transformOrigin = '50% 100%';

  const gateArmRight1 = document.createElement('div');
  gateArmRight1.id = 'gate_arm_right_1';
  gateArmRight1.style.position = 'absolute';
  gateArmRight1.style.left = '33px';
  gateArmRight1.style.top = '84px';
  gateArmRight1.style.width = '26px';
  gateArmRight1.style.height = '61px';
  gateArmRight1.style.background =
    "url('assets/open_close_gate_01_0003_arm_right_1.png')";
  gateArmRight1.style.transformOrigin = '50% 100%';

  const gateArmLeft1 = document.createElement('div');
  gateArmLeft1.id = 'gate_arm_left_1';
  gateArmLeft1.style.position = 'absolute';
  gateArmLeft1.style.left = '87px';
  gateArmLeft1.style.top = '83px';
  gateArmLeft1.style.width = '26px';
  gateArmLeft1.style.height = '51px';
  gateArmLeft1.style.background =
    "url('assets/open_close_gate_01_0006_arm_left_1.png')";
  gateArmLeft1.style.transformOrigin = '50% 100%';

  const gateArmRight2 = document.createElement('div');
  gateArmRight2.id = 'gate_arm_right_2';
  gateArmRight2.style.position = 'absolute';
  gateArmRight2.style.left = '41px';
  gateArmRight2.style.top = '47px';
  gateArmRight2.style.width = '28px';
  gateArmRight2.style.height = '47px';
  gateArmRight2.style.background =
    "url('assets/open_close_gate_01_0002_arm_right_2.png')";
  gateArmRight2.style.transformOrigin = '50% 0';

  const gateArmLeft2 = document.createElement('div');
  gateArmLeft2.id = 'gate_arm_left_2';
  gateArmLeft2.style.position = 'absolute';
  gateArmLeft2.style.left = '85px';
  gateArmLeft2.style.top = '57px';
  gateArmLeft2.style.width = '21px';
  gateArmLeft2.style.height = '34px';
  gateArmLeft2.style.background =
    "url('assets/open_close_gate_01_0005_arm_left_2.png')";
  gateArmLeft2.style.transformOrigin = '50% 0';

  const gateLever = document.createElement('div');
  gateLever.id = 'gate_lever';
  gateLever.style.position = 'absolute';
  gateLever.style.left = '-44px';
  gateLever.style.top = '32px';
  gateLever.style.width = '320px';
  gateLever.style.height = '220px';
  gateLever.style.background =
    "url('assets/open_close_gate_01_0000_lever_v2.png')";
  gateLever.style.cursor = 'grab';
  gateLever.style.transform = `rotate(${initState.lever.rotate}deg)`;
  gateLever.style.transformOrigin = '100% 30%';

  gateBg.appendChild(gateHead);
  gateBg.appendChild(gateArmLeft1);
  gateBg.appendChild(gateBody);
  gateBg.appendChild(gateArmLeft2);
  gateBg.appendChild(gateArmRight1);
  gateBg.appendChild(gateArmRight2);
  gateBg.appendChild(gateLever);

  container.appendChild(gateBg);

  return {
    gateHead,
    gateBody,
    gateArmRight1,
    gateArmLeft1,
    gateArmRight2,
    gateArmLeft2,
    gateLever,
  };
};

const updateAnimation = (elements, diffY, state) => {
  const {
    gateHead,
    gateBody,
    gateArmRight1,
    gateArmLeft1,
    gateArmRight2,
    gateArmLeft2,
    gateLever,
  } = elements;

  // LEVER
  const newLeverRotate = -0.01 * diffY + state.lever.rotate;

  state.lever.rotate = newLeverRotate;
  gateLever.style.transform = `rotate(${newLeverRotate}deg)`;

  // BODY
  const newBodyHeightScale = -0.00011 * diffY + state.body.heightScale;

  state.body.heightScale = newBodyHeightScale;
  gateBody.style.transform = `scaleY(${newBodyHeightScale})`;

  // HEAD
  const newHeadY = 0.005 * diffY + state.head.y;

  state.head.y = newHeadY;
  gateHead.style.top = `${newHeadY}px`;

  // ARM_RIGHT_1
  const newArmRight1Y = 0.001 * diffY + state.armRight1.y;
  const newArmRight1X = 0.015 * diffY + state.armRight1.x;
  const newArmRight1Rotate = -0.045 * diffY + state.armRight1.rotate;
  const newArmRight1WidthScale = -0.00011 * diffY + state.armRight1.widthScale;

  state.armRight1.y = newArmRight1Y;
  gateArmRight1.style.top = `${newArmRight1Y}px`;
  state.armRight1.x = newArmRight1X;
  gateArmRight1.style.left = `${newArmRight1X}px`;
  state.armRight1.rotate = newArmRight1Rotate;
  state.armRight1.widthScale = newArmRight1WidthScale;
  gateArmRight1.style.transform = `rotate(${newArmRight1Rotate}deg) scaleY(${newArmRight1WidthScale})`;
  // gateArmRight1.style.transform = `scaleX(${newArmRight1WidthScale})`;

  // ARM_RIGHT_2
  const newArmRight2Y = 0.035 * diffY + state.armRight2.y;
  const newArmRight2X = -0.0023 * diffY + state.armRight2.x;

  const newArmRight2Rotate = 0.025 * diffY + state.armRight2.rotate;

  state.armRight2.y = newArmRight2Y;
  gateArmRight2.style.top = `${newArmRight2Y}px`;
  state.armRight2.x = newArmRight2X;
  gateArmRight2.style.left = `${newArmRight2X}px`;
  state.armRight2.rotate = newArmRight2Rotate;
  gateArmRight2.style.transform = `rotate(${newArmRight2Rotate}deg)`;

  // ARM_LEFT_1
  const newArmLeft1Y = 0.0015 * diffY + state.armLeft1.y;
  const newArmLeft1X = -0.015 * diffY + state.armLeft1.x;
  const newArmLeft1Rotate = 0.045 * diffY + state.armLeft1.rotate;

  state.armLeft1.y = newArmLeft1Y;
  gateArmLeft1.style.top = `${newArmLeft1Y}px`;
  state.armLeft1.x = newArmLeft1X;
  gateArmLeft1.style.left = `${newArmLeft1X}px`;
  state.armLeft1.rotate = newArmLeft1Rotate;
  gateArmLeft1.style.transform = `rotate(${newArmLeft1Rotate}deg)`;

  // ARM_LEFT_2
  const newArmLeft2Y = 0.03 * diffY + state.armLeft2.y;
  const newArmLeft2X = -0.0023 * diffY + state.armLeft2.x;
  const newArmLeft2Rotate = -0.03 * diffY + state.armLeft2.rotate;

  state.armLeft2.y = newArmLeft2Y;
  gateArmLeft2.style.top = `${newArmLeft2Y}px`;
  state.armLeft2.x = newArmLeft2X;
  gateArmLeft2.style.left = `${newArmLeft2X}px`;
  state.armLeft2.rotate = newArmLeft2Rotate;
  gateArmLeft2.style.transform = `rotate(${newArmLeft2Rotate}deg)`;
};

const createOpenClosegateAnimation = () => {
  const animationContainer = document.body.querySelector(animationContainerId);
  const targetInput = document.body.querySelector(targetInputId);

  if (animationContainer && targetInput) {
    const elements = createLayout(animationContainer);
    const { gateLever } = elements;

    const state = { ...initState };

    gateLever.addEventListener('mousedown', (event) => {
      const originY = event.y;
      let prevDiffY = 0;

      const move = (diffY) => {
        const newLeverRotate = -0.01 * diffY + state.lever.rotate;

        if (newLeverRotate >= -4 && newLeverRotate <= 16) {
          updateAnimation(elements, diffY, state);
          updateInput(newLeverRotate);
        }
      };

      const handleMouseMove = (event) => {
        const diffY = event.y - originY;

        if (diffY !== prevDiffY) {
          move(diffY);
          prevDiffY = diffY;
        }
      };

      gateLever.addEventListener('mousemove', handleMouseMove);

      const handleMouseUp = () => {
        gateLever.removeEventListener('mousemove', handleMouseMove);
        gateLever.removeEventListener('mouseup', handleMouseUp);
      };

      gateLever.addEventListener('mouseup', handleMouseUp);
    });
  }
};

createOpenClosegateAnimation();
