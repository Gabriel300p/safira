import { animated, useSpring } from "@react-spring/web";
import { useEffect } from "react";

interface NumberFlowProps {
  value: number;
  format?: Intl.NumberFormatOptions;
  locales?: string | string[];
}

const NumberFlow: React.FC<NumberFlowProps> = ({ value, format, locales }) => {
  const [springProps, springApi] = useSpring(() => ({
    value: 0,
    config: { tension: 170, friction: 26 },
  }));

  useEffect(() => {
    springApi.start({ value });
  }, [value, springApi]);

  return (
    <animated.span>
      {springProps.value.to((val) =>
        new Intl.NumberFormat(locales, format).format(Math.floor(val))
      )}
    </animated.span>
  );
};

export default NumberFlow;
