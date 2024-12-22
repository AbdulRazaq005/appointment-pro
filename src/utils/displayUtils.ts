import moment from "moment";

export function displayTimeSlot({ from, to }: { from: Date; to: Date }) {
  if (from && to) {
    return `${moment(from).format("hh:mm a")} - ${moment(to).format(
      "hh:mm a"
    )}`;
  } else {
    return `---`;
  }
}
