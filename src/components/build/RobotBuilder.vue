<template>
  <div v-if="availableParts" class="content">
    <div class="preview">
      <CollapsibleSection>
        <div class="preview-content">
          <div class="top-row">
            <img :src="selectedRobot.head.src" />
          </div>
          <div class="middle-row">
            <img :src="selectedRobot.leftArm.src" class="rotate-left" />
            <img :src="selectedRobot.torso.src" />
            <img :src="selectedRobot.rightArm.src" class="rotate-right" />
          </div>
          <div class="bottom-row">
            <img :src="selectedRobot.base.src" />
          </div>
        </div>
      </CollapsibleSection>
      <button @click="addToCart()" class="add-to-cart">Add to cart</button>
    </div>

    <div class="top-row">
      <PartSelector
        :parts="availableParts.heads"
        position="top"
        @partSelected="part => (selectedRobot.head = part)"
      />
    </div>
    <div class="middle-row">
      <PartSelector
        :parts="availableParts.arms"
        position="left"
        @partSelected="part => (selectedRobot.leftArm = part)"
      />
      <PartSelector
        :parts="availableParts.torsos"
        position="center"
        @partSelected="part => (selectedRobot.torso = part)"
      />
      <PartSelector
        :parts="availableParts.arms"
        position="right"
        @partSelected="part => (selectedRobot.rightArm = part)"
      />
    </div>
    <div class="bottom-row">
      <PartSelector
        :parts="availableParts.bases"
        position="bottom"
        @partSelected="part => (selectedRobot.base = part)"
      />
    </div>
  </div>
</template>

<script>
import createdHookMixin from "./createdHookMixin";
import PartSelector from "./PartSelector.vue";
import CollapsibleSection from "../../shared/CollapsibleSection.vue";
import { mapActions, mapState } from "vuex";

export default {
  name: "RobotBuilder",
  components: { PartSelector, CollapsibleSection },
  mixins: [createdHookMixin],
  created() {
    this.getParts();
  },
  data() {
    return {
      cart: [],
      selectedRobot: {
        head: {},
        leftArm: {},
        torso: {},
        rightArm: {},
        base: {},
        addedToCart: false
      }
    };
  },
  beforeRouteLeave(to, from, next) {
    if (this.addedToCart) {
      next(true);
    } else {
      const response = confirm(
        "You have not added the robot to cart. Are you sure you want to leave?"
      );
      next(response);
    }
  },
  computed: {
    ...mapState({ availableParts: state => state.robots.parts })
  },
  methods: {
    ...mapActions("robots", ["addRobotToCart", "getParts"]),
    addToCart() {
      const robot = this.selectedRobot;
      const cost =
        robot.head.cost +
        robot.leftArm.cost +
        robot.torso.cost +
        robot.rightArm.cost +
        robot.base.cost;

      this.addRobotToCart(Object.assign({}, robot, { cost })).then(() =>
        this.$router.push({ name: "Cart" })
      );
      this.addedToCart = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.content {
  position: relative;
}
.top-row {
  display: flex;
  justify-content: space-around;
}
.middle-row {
  display: flex;
  justify-content: center;
}
.bottom-row {
  display: flex;
  justify-content: space-around;
  border-top: none;
}
.robot-name {
  position: absolute;
  top: -25px;
  text-align: center;
  width: 100%;
}
.add-to-cart {
  position: absolute;
  width: 210px;
  padding: 3px;
  font-size: 16px;
}
.preview {
  position: absolute;
  top: -20px;
  right: 0;
  width: 210px;
  height: 210px;
  padding: 5px;
}
.preview-content {
  border: 1px solid #999;
}
.preview img {
  width: 50px;
  height: 50px;
}
.rotate-right {
  transform: rotate(90deg);
}
.rotate-left {
  transform: rotate(-90deg);
}
</style>
