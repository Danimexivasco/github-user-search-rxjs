import {
  Stack,
  Typography,
  Tooltip,
  Slider,
  IconButton
} from "@mui/material";
import HelpIcon from "@mui/icons-material/Help";
import { useState } from "preact/hooks";

type DebounceSliderProps = {
  debounceValue: number;
  onChange: (_value: number) => void;
};

function valueText(value: number) {
  return `${value} ms`;
}

const marks = [
  {
    value: 0,
    label: "0ms"
  },
  {
    value: 1500,
    label: "1500ms"
  },
  {
    value: 3000,
    label: "3000ms"
  }
];

export default function DebounceSlider({ debounceValue, onChange }: DebounceSliderProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <Stack
      direction={"column"}
      sx={{
        width: {
          xs: "85%",
          sm: "50%"
        }
      }}
    >
      <Stack
        direction={"row"}
        alignItems={"center"}
      >
        <Typography>Debounce in ms</Typography>
        <Tooltip
          title="Delay search requests while typing. Adjust to reduce API calls. Higher values mean more delay after typing. Ie. 1000ms = 1s."
          arrow
          placement="top"
          open={showTooltip}
          onClose={() => setShowTooltip(false)}
          onClick={() => setShowTooltip(!showTooltip)}
          enterTouchDelay={0}
          leaveTouchDelay={3000}
        >
          <IconButton>
            <HelpIcon
              sx={{
                pointerEvents: "none"
              }}
            />
            {/* Help */}
          </IconButton>
        </Tooltip>
      </Stack>
      <Slider
        aria-label="debounce in ms"
        defaultValue={300}
        value={debounceValue}
        onChange={(_, value) => onChange(value)}
        getAriaValueText={valueText}
        valueLabelDisplay="auto"
        shiftStep={30}
        step={100}
        marks={marks}
        min={0}
        max={3000}
      />
    </Stack>
  );
}