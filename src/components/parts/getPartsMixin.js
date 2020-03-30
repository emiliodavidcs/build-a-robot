import { mapActions, mapState } from "vuex";

export default {
  created() {
    this.getParts();
  },
  methods: {
    ...mapActions("robots", ["getParts"])
  },
  computed: {
    ...mapState({ storeParts: state => state.robots.parts }),
    parts() {
      return (
        this.storeParts || {
          heads: [],
          arms: [],
          torsos: [],
          bases: []
        }
      );
    }
  }
};
