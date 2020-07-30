# Change terminal directory to the current Finder directory

It's easy to open a folder in Finder from the shell, but what about the other way around?
This is a function that works in bash/zsh (I haven't tried in other shells) to change to the current open directory in front Finder window.

```bash
cdf() {
    target=`osascript -e 'tell application "Finder" to if (count of Finder windows) > 0 then get POSIX path of (target of front Finder window as text)'`
    if [ "$target" != "" ]; then
        cd "$target"; pwd
    else
        echo 'No Finder window found' >&2
    fi
}
```

Tags:

- `[[Terminal]]`
- `[[Zsh]]`

Contributor: `[[TreTuna]]`
