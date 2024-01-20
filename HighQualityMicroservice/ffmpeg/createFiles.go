package ffmpeg

import (
	"fmt"
	"os"
	"os/exec"
)

func Create(videoBuffer []byte) error {
	// Check if the temp directory exists, if not create it
	if _, err := os.Stat("./temp"); os.IsNotExist(err) {
		err := os.Mkdir("./temp", 0755)
		if err != nil {
			return err
		}
	}

	originalDir, err := os.Getwd()
	if err != nil {
		return err
	}

	// Change to the desired directory
	err = os.Chdir("temp")
	if err != nil {
		return err
	}

	// Write the buffer to a temporary file
	tmpfile, err := os.CreateTemp("", "example.*.mp4")
	if err != nil {
		return err
	}
	defer os.Remove(tmpfile.Name()) // clean up

	if _, err := tmpfile.Write(videoBuffer); err != nil {
		return err
	}
	if err := tmpfile.Close(); err != nil {
		return err
	}

	// Execute the ffmpeg command
	cmd := exec.Command("ffmpeg", "-i", tmpfile.Name(), "-map", "0", "-b:v:0", "500k", "-s:v:0", "640x360", "-c:v:0", "libx264", "-b:a:0", "96k", "-map", "0", "-b:v:1", "1000k", "-s:v:1", "1280x720", "-c:v:1", "libx264", "-b:a:1", "128k", "-map", "0", "-b:v:2", "3000k", "-s:v:2", "1920x1080", "-c:v:2", "libx264", "-b:a:2", "192k", "-f", "dash", "-use_template", "1", "-use_timeline", "1", "-seg_duration", "4", "-adaptation_sets", "id=0,streams=v id=1,streams=a", "output.mpd")
	err = cmd.Run()
	if err != nil {
		fmt.Print(err)
	}

	// Change back to the original directory
	err = os.Chdir(originalDir)
	if err != nil {
		return err
	}

	return err
}

func Delete() {
	// Check if the temp directory exists, if not create it
	if _, err := os.Stat("./temp"); os.IsNotExist(err) {
		return
	}

	os.RemoveAll("./temp")
	return
}
