import AV from "@/utils/leancloud"

class Gist extends AV.Object {
  public name;
  public url;
  public desc;
}

AV.Object.register(Gist)

export default Gist