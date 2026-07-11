"""
Extract audio from a video and transcribe it using OpenAI Whisper.
Usage: python scripts/transcribe_video.py "path/to/video.mp4"
"""

import sys
import os
import subprocess
import json

# Ensure ffmpeg is on PATH (WinGet install location)
_ffmpeg_dir = (
    r"C:\Users\ADMIN\AppData\Local\Microsoft\WinGet\Packages"
    r"\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe"
    r"\ffmpeg-8.1.1-full_build\bin"
)
if os.path.isdir(_ffmpeg_dir) and _ffmpeg_dir not in os.environ.get("PATH", ""):
    os.environ["PATH"] = _ffmpeg_dir + os.pathsep + os.environ.get("PATH", "")

import whisper

def extract_audio(video_path, audio_path):
    print(f"Extracting audio from: {video_path}")
    # Locate ffmpeg — try PATH first, then WinGet install location
    ffmpeg_bin = "ffmpeg"
    import shutil
    if not shutil.which("ffmpeg"):
        candidate = (
            r"C:\Users\ADMIN\AppData\Local\Microsoft\WinGet\Packages"
            r"\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe"
            r"\ffmpeg-8.1.1-full_build\bin\ffmpeg.exe"
        )
        if os.path.exists(candidate):
            ffmpeg_bin = candidate

    cmd = [
        ffmpeg_bin, "-y",
        "-i", video_path,
        "-vn",                  # no video
        "-acodec", "pcm_s16le", # WAV format
        "-ar", "16000",         # 16kHz (Whisper default)
        "-ac", "1",             # mono
        audio_path
    ]
    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode != 0:
        print("ffmpeg error:", result.stderr)
        sys.exit(1)
    print(f"Audio saved: {audio_path}")

def transcribe(audio_path):
    print("Loading Whisper model (medium)... this may take a moment.")
    model = whisper.load_model("small")
    print("Transcribing... (this may take several minutes on CPU)")
    result = model.transcribe(audio_path, verbose=False)
    return result

def main():
    if len(sys.argv) < 2:
        print("Usage: python transcribe_video.py <video_path>")
        sys.exit(1)

    video_path = sys.argv[1]
    if not os.path.exists(video_path):
        print(f"File not found: {video_path}")
        sys.exit(1)

    base = os.path.splitext(os.path.basename(video_path))[0]
    out_dir = os.path.join(os.path.dirname(__file__), "..", "scripts", "transcripts")
    os.makedirs(out_dir, exist_ok=True)

    audio_path = os.path.join(out_dir, base + ".wav")
    txt_path   = os.path.join(out_dir, base + ".txt")
    json_path  = os.path.join(out_dir, base + ".json")

    extract_audio(video_path, audio_path)
    result = transcribe(audio_path)

    # Save full text
    with open(txt_path, "w", encoding="utf-8") as f:
        f.write(result["text"])

    # Save timestamped segments
    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(result["segments"], f, indent=2, ensure_ascii=False)

    # Print safely (replace unencodable chars)
    safe_text = result["text"].encode("cp1252", errors="replace").decode("cp1252")
    print(f"\n=== TRANSCRIPT ===\n{safe_text}\n")
    print(f"Saved text:     {txt_path}")
    print(f"Saved segments: {json_path}")

if __name__ == "__main__":
    main()
