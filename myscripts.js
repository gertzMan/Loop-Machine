// define an immediately evoked function expression

(function () {
  // put all the track ids in an array

  const play_list = [
    "tambourine.mp3",
    "ALL TRACK.mp3",
    "B VOC.mp3",
    "DRUMS.mp3",
    "HE HE VOC.mp3",
    "HIGH VOC.mp3",
    "JIBRISH.mp3",
    "LEAD 1.mp3",
    "UUHO VOC.mp3",
  ];

  // create a background array for the rows
  const back_grounds = [
    "bg-success",
    "bg-warning",
    "bg-info",
    "bg-danger",
    "bg-papaya",
    "bg-crimson",
    "bg-teal",
    "bg-tomato",
    "bg-powderblue",
  ];

  // selectors for control elements
  const play_btn = document.getElementById("play_btn");
  const stop_btn = document.getElementById("stop_btn");
  const loop_btn = document.querySelector('input[name="loop_switch"]');

  // hide stop and loop button by default
  stop_btn.style.display = "none";
  loop_btn.style.display = "none";

  // initialize song

  function init_song(song, index) {
    // create html audio element
    const music = document.createElement("audio");
    // specify audio soruce
    music.src = `./Assets/${song}`;
    // specify audio type
    music.type = "audio/mpeg";
    // specify id (allows to manipulate the play list array)
    music.id = song;

    // create html elements

    const music_div = document.createElement("div");
    const music_info = document.createElement("div");
    const mute_switch_div = document.createElement("div");

    const mute_switch = document.createElement("label");
    const mute_toggle = document.createElement("input");
    const mute_span = document.createElement("span");
    const music_info_div = document.createElement("div");

    music_info_div.className = "col-9";
    music_div.className =
      "row mb-1 border progress justify-content-between song_div";
    music_info.className = ` progress-bar  ${back_grounds[index]}  `;
    music_info.setAttribute("role", `progressbar`);
    music_info.setAttribute("aria-valuemin", "0");
    music_info.setAttribute("aria-valuemax", "100");
    music_info.style.width = "0%";
    music_info.setAttribute("aria-valuenow", "0");
    mute_switch_div.className = "col-3 align-items-center";
    mute_switch_div.style.lineHeight = "32px";
    mute_switch.classList = "switch";
    mute_toggle.setAttribute("type", "checkbox");
    mute_toggle.className = "mute_toggle";
    mute_toggle.setAttribute("data-id", song);
    mute_toggle.setAttribute("name", "mute_switch");
    mute_span.className = "slider round";
    mute_toggle.setAttribute("type", "checkbox");

    mute_switch.appendChild(mute_toggle);
    mute_switch.appendChild(mute_span);

    mute_switch_div.innerHTML = "<span>Mute</span>";
    mute_switch_div.appendChild(mute_switch);
    music_div.appendChild(music);
    music_info_div.appendChild(music_info);
    music_div.appendChild(music_info_div);
    music_div.appendChild(mute_switch_div);
    document.getElementById("music_box").append(music_div);
    // play music
    music.play();

    // initialize views current playing time
    music.addEventListener("timeupdate", function () {
      var { currentTime, duration } = music;

      var color =
        "#" + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0");

      music_info.style.width = `${Math.ceil((currentTime / duration) * 100)}%`;
      music_info.setAttribute(
        "aria-valuenow",
        `${Math.ceil((currentTime / duration) * 100)}%`
      );

      music_info.innerHTML =
        `      <span style="color:${color}" class="sr-only">${Math.ceil(
          (currentTime / duration) * 100
        )}% Complete</span>
          ` + song;

      play_btn.style.display = "none";

      if (Math.ceil((currentTime / duration) * 100) == 100) {
        play_btn.style.display = "inline-block";
        stop_btn.style.display = "none";
      }
    });
  }

  function stop_songs() {
    //find the audio elemnt with

    const music = document.querySelectorAll("audio");

    music.forEach((elem) => {
      elem.pause();
      elem.currentTime = 0;
    });
  }

  function loop_songs(value) {
    const music = document.querySelectorAll("audio");

    music.forEach((elem) => {
      elem.loop = value;
    });
  }

  function mute_song(song, value) {
    const music = document.querySelectorAll("audio");

    music.forEach((elem) => {
      if (elem.id === song) {
        elem.muted = value;
      }
    });
  }

  play_btn.addEventListener("click", function (e) {
    // clear div

    document.getElementById("music_box").innerHTML = "";

    e.preventDefault();

    play_list.map((song, index) => {
      console.log({ song, index });

      // initialize each song
      init_song(song, index);

      // functionality for muting
      if (document.querySelectorAll('input[name="mute_switch"]')) {
        document
          .querySelectorAll('input[name="mute_switch"]')
          .forEach((elem) => {
            elem.addEventListener("change", function (event) {
              const data_id = event.target.getAttribute("data-id");
              const value = event.target.checked;
              mute_song(data_id, value);
            });
          });
      }
    });

    play_btn.style.display = "inline-block";
    stop_btn.style.display = "inline-block";
  });

  stop_btn.addEventListener("click", function (e) {
    e.preventDefault();

    // document.getElementById("music_box").innerHTML = ""
    play_btn.style.display = "inline-block";

    stop_songs();

    play_btn.style.display = "inline-block";
    stop_btn.style.display = "none";
  });

  loop_btn.addEventListener("change", function (event) {
    const value = event.target.checked;

    if (value === true) {
      loop_songs(true);
    } else {
      loop_songs(false);
    }
  });
})();
