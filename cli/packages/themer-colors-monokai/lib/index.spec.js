const { colors } = require("./index");

describe("themer-colors-monokai", () => {
  it('should not contain a light scheme', () => {
    expect(colors.light).toBeUndefined();
  })

  it("should define all required colors for the dark scheme", () => {
    const prefixes = [
      "accent0",
      "accent1",
      "accent2",
      "accent3",
      "accent4",
      "accent5",
      "accent6",
      "accent7",
      "shade0",
      "shade7",
    ];
    prefixes.forEach((prefix) => {
      expect(colors.dark[prefix]).toBeDefined();
    });
  });
});
