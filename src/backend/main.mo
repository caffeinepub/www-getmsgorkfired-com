import Map "mo:core/Map";
import Principal "mo:core/Principal";

actor {
  let votes = Map.empty<Principal, Bool>();

  public shared ({ caller }) func vote(yes : Bool) : async () {
    votes.add(caller, yes);
  };
};
